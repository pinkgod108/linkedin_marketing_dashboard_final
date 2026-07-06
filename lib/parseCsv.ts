import Papa from "papaparse";
import { Post, RawCsvRow } from "./types";
import { inferTopic } from "./topics";

// Maps normalized (lowercase, no spaces/underscores) header names to the
// fields we care about, so small variations in the CSV header row
// ("Members Reached" vs "Reached", "URL" vs "Link") still work.
const FIELD_ALIASES: Record<string, string[]> = {
  date: ["date"],
  time: ["time"],
  title: ["title", "post", "posttitle"],
  impressions: ["impressions", "views"],
  membersReached: ["membersreached", "reached"],
  articleViews: ["articleviews"],
  reactions: ["reactions", "likes"],
  comments: ["comments"],
  shares: ["shares", "reposts"],
  url: ["url", "link", "posturl"],
  topic: ["topic"],
};

function normalizeHeader(header: string): string {
  return header.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function buildHeaderMap(headers: string[]): Record<string, string> {
  const normalizedHeaders = headers.map((h) => ({
    original: h,
    normalized: normalizeHeader(h),
  }));

  const map: Record<string, string> = {};

  for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
    const match = normalizedHeaders.find((h) => aliases.includes(h.normalized));
    if (match) {
      map[field] = match.original;
    }
  }

  return map;
}

function toNumber(value: string | undefined): number {
  if (!value) return 0;
  const cleaned = value.replace(/[,%]/g, "").trim();
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

export function rowsToPosts(rows: RawCsvRow[], headers: string[]): Post[] {
  const map = buildHeaderMap(headers);

  return rows
    .filter((row) => Object.values(row).some((v) => (v ?? "").toString().trim() !== ""))
    .map((row) => {
      const title = (map.title ? row[map.title] : "")?.trim() || "Untitled Post";
      const impressions = toNumber(map.impressions ? row[map.impressions] : undefined);
      const reactions = toNumber(map.reactions ? row[map.reactions] : undefined);
      const comments = toNumber(map.comments ? row[map.comments] : undefined);
      const shares = toNumber(map.shares ? row[map.shares] : undefined);
      const membersReached = toNumber(map.membersReached ? row[map.membersReached] : undefined);
      const articleViews = toNumber(map.articleViews ? row[map.articleViews] : undefined);
      const topic = map.topic && row[map.topic]?.trim() ? row[map.topic].trim() : inferTopic(title);

      const engagementRate =
        impressions > 0 ? ((reactions + comments + shares) / impressions) * 100 : 0;

      return {
        date: map.date ? (row[map.date] || "").trim() : "",
        time: map.time ? (row[map.time] || "").trim() : "",
        title,
        impressions,
        membersReached,
        articleViews,
        reactions,
        comments,
        shares,
        url: map.url ? (row[map.url] || "").trim() : "",
        topic,
        engagementRate,
      };
    });
}

export function parseCsvText(csvText: string): Post[] {
  const result = Papa.parse<RawCsvRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const headers = result.meta.fields ?? [];
  return rowsToPosts(result.data, headers);
}
