"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TopicPerformance } from "@/lib/metrics";
import ChartCard from "./ChartCard";
import { CHART_COLORS } from "./chartTheme";

const PALETTE = [CHART_COLORS.maroon, CHART_COLORS.sienna, CHART_COLORS.mustard];

export default function TopicChart({ data }: { data: TopicPerformance[] }) {
  const chartData = data.map((item) => ({
    name: item.topic,
    "Avg. Engagement Rate": Number(item.averageEngagementRate.toFixed(2)),
  }));

  return (
    <ChartCard title="Topic Performance">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: 24, bottom: 24 }}>
          <CartesianGrid stroke={CHART_COLORS.gridLine} vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: CHART_COLORS.text, fontSize: 12 }}
            angle={-15}
            textAnchor="end"
            height={50}
          />
          <YAxis tick={{ fill: CHART_COLORS.text, fontSize: 12 }} unit="%" />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: "1px solid #E7DFD1" }}
            cursor={{ fill: "rgba(224, 165, 38, 0.1)" }}
          />
          <Bar dataKey="Avg. Engagement Rate" radius={[6, 6, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={PALETTE[index % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
