"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { week: "Week 1", retention: 100 },
  { week: "Week 2", retention: 75 },
  { week: "Week 3", retention: 65 },
  { week: "Week 4", retention: 58 },
  { week: "Week 5", retention: 52 },
  { week: "Week 6", retention: 48 },
]

const LINE_COLOR = "hsl(217 91% 60%)" // blue
const TICK_FILL = "rgba(255,255,255,0.7)"
const GRID_STROKE = "rgba(255,255,255,0.08)"

export default function UserRetentionChart() {
  return (
    <Card className="h-full rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 shadow-none">
      <CardHeader>
        <CardTitle className="text-white">User Retention (6 Weeks)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={GRID_STROKE}
                vertical={false}
              />
              <XAxis
                dataKey="week"
                tickLine={{ stroke: GRID_STROKE }}
                axisLine={false}
                tick={{ fontSize: 12, fill: TICK_FILL }}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickLine={{ stroke: GRID_STROKE }}
                axisLine={false}
                tick={{ fontSize: 12, fill: TICK_FILL }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.15)",
                  backgroundColor: "#10211a",
                }}
                formatter={(value: number | undefined) => [`${value ?? 0}%`, "Retention"]}
                labelFormatter={(label) => label}
                labelStyle={{ color: "rgba(255,255,255,0.9)" }}
                itemStyle={{ color: "rgba(255,255,255,0.8)" }}
                cursor={false}
              />
              <Line
                type="monotone"
                dataKey="retention"
                stroke={LINE_COLOR}
                strokeWidth={2}
                dot={{ fill: LINE_COLOR, r: 4, strokeWidth: 0 }}
                activeDot={{
                  r: 5,
                  fill: LINE_COLOR,
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
