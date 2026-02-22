"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Posts", value: 2700 },
  { name: "Ratings", value: 900 },
  { name: "Tournament Entries", value: 480 },
]

const BAR_COLOR = "hsl(160 84% 45%)" // vibrant teal/green
const TICK_FILL = "rgba(255,255,255,0.7)"
const GRID_STROKE = "rgba(255,255,255,0.08)"

export default function EngagementMetricsChart() {
  return (
    <Card className="h-full rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 shadow-none">
      <CardHeader>
        <CardTitle className="text-white">Engagement Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={GRID_STROKE}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tickLine={{ stroke: GRID_STROKE }}
                axisLine={false}
                tick={{ fontSize: 12, fill: TICK_FILL }}
              />
              <YAxis
                domain={[0, 3600]}
                ticks={[0, 900, 1800, 2700, 3600]}
                tickLine={{ stroke: GRID_STROKE }}
                axisLine={false}
                tick={{ fontSize: 12, fill: TICK_FILL }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.15)",
                  backgroundColor: "#10211a",
                }}
                formatter={(value: number | undefined) => [`${value?.toLocaleString() ?? 0}`, "Count"]}
                labelFormatter={(label) => label}
                labelStyle={{ color: "rgba(255,255,255,0.9)" }}
                itemStyle={{ color: "rgba(255,255,255,0.8)" }}
              />
              <Bar
                dataKey="value"
                fill={BAR_COLOR}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
