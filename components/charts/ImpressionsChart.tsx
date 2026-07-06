"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Post } from "@/lib/types";
import ChartCard from "./ChartCard";
import { CHART_COLORS, shortenLabel } from "./chartTheme";

export default function ImpressionsChart({ posts }: { posts: Post[] }) {
  const data = posts.map((post) => ({
    name: shortenLabel(post.title),
    Impressions: post.impressions,
  }));

  return (
    <ChartCard title="Impressions by Post">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 24, bottom: 24 }}>
          <CartesianGrid stroke={CHART_COLORS.gridLine} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            angle={-20}
            textAnchor="end"
            height={50}
          />
          <YAxis tick={{ fill: CHART_COLORS.text, fontSize: 12 }} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #E7DFD1" }}
            cursor={{ fill: "rgba(224, 165, 38, 0.1)" }}
          />
          <Bar dataKey="Impressions" fill={CHART_COLORS.maroon} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
