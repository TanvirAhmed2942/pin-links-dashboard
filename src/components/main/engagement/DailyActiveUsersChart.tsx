"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { date: "Jun 1", users: 3200 },
  { date: "Jun 2", users: 3350 },
  { date: "Jun 3", users: 3100 },
  { date: "Jun 4", users: 3400 },
  { date: "Jun 5", users: 3250 },
  { date: "Jun 6", users: 3380 },
  { date: "Jun 7", users: 3300 },
]

const FILL_COLOR = "hsl(160 84% 45%)" // vibrant teal/green
const TICK_FILL = "rgba(255,255,255,0.7)"
const GRID_STROKE = "rgba(255,255,255,0.08)"

export default function DailyActiveUsersChart() {
  return (
    <Card className="rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 shadow-none">
      <CardHeader>
        <CardTitle className="text-white">
          Daily Active Users (Last 7 Days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="dailyActiveUsersGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="100%"
                    stopColor={FILL_COLOR}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor={FILL_COLOR}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={GRID_STROKE}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tickLine={{ stroke: GRID_STROKE }}
                axisLine={false}
                tick={{ fontSize: 12, fill: TICK_FILL }}
              />
              <YAxis
                domain={[0, 6000]}
                ticks={[0, 1500, 3000, 4500, 6000]}
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
                labelStyle={{ color: "rgba(255,255,255,0.9)" }}
                itemStyle={{ color: "rgba(255,255,255,0.8)" }}
                formatter={(value: number | undefined) => [`${value?.toLocaleString() ?? 0}`, "Users"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke={FILL_COLOR}
                strokeWidth={0}
                fill="url(#dailyActiveUsersGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
