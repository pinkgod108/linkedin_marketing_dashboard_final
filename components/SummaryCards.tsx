import { SummaryStats } from "@/lib/types";
import StatCircle from "./StatCircle";

interface SummaryCardsProps {
  summary: SummaryStats;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl2 bg-cream-light p-5 shadow-soft">
      <p className="text-sm font-medium text-neutral-700">{label}</p>
      <p className="mt-2 text-2xl font-bold text-maroon">{value}</p>
    </div>
  );
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <MetricCard label="Posts Analyzed" value={summary.totalPosts.toLocaleString()} />
        <MetricCard label="Total Impressions" value={summary.totalImpressions.toLocaleString()} />
        <MetricCard label="Total Reactions" value={summary.totalReactions.toLocaleString()} />
        <MetricCard label="Total Comments" value={summary.totalComments.toLocaleString()} />
        <MetricCard label="Total Shares" value={summary.totalShares.toLocaleString()} />
        <div className="col-span-2 sm:col-span-1">
          <StatCircle label="Avg. Engagement Rate" value={summary.averageEngagementRate} accent="mustard" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl2 border-l-4 border-mustard bg-cream-light p-5 shadow-soft">
          <p className="text-sm font-semibold text-sienna-dark">Best Performing Post</p>
          <p className="mt-1 font-medium text-maroon">{summary.bestByEngagement?.title ?? "—"}</p>
          <p className="mt-1 text-sm text-neutral-700">
            {summary.bestByEngagement ? `${summary.bestByEngagement.engagementRate.toFixed(2)}% engagement rate` : ""}
          </p>
        </div>
        <div className="rounded-xl2 border-l-4 border-sienna bg-cream-light p-5 shadow-soft">
          <p className="text-sm font-semibold text-sienna-dark">Most Viewed Post</p>
          <p className="mt-1 font-medium text-maroon">{summary.mostViewed?.title ?? "—"}</p>
          <p className="mt-1 text-sm text-neutral-700">
            {summary.mostViewed ? `${summary.mostViewed.impressions.toLocaleString()} impressions` : ""}
          </p>
        </div>
        <div className="rounded-xl2 border-l-4 border-maroon bg-cream-light p-5 shadow-soft">
          <p className="text-sm font-semibold text-sienna-dark">Top Topic</p>
          <p className="mt-1 font-medium text-maroon">{summary.topTopic?.topic ?? "—"}</p>
          <p className="mt-1 text-sm text-neutral-700">
            {summary.topTopic ? `${summary.topTopic.averageEngagementRate.toFixed(2)}% avg. engagement` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
