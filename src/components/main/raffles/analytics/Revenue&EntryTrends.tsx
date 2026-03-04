"use client"

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { month: "Jan", revenue: 2500, entries: 100 },
  { month: "Feb", revenue: 3200, entries: 200 },
  { month: "Mar", revenue: 2800, entries: 150 },
  { month: "Apr", revenue: 4200, entries: 300 },
  { month: "May", revenue: 3800, entries: 250 },
  { month: "Jun", revenue: 4700, entries: 350 },
]

const REVENUE_COLOR = "#00C49F"
const ENTRIES_COLOR = "#38BDF8"

export default function RevenueEntryTrends() {
  return (
    <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none">
      <CardHeader>
        <CardTitle className="text-white text-xl font-semibold">
          Revenue & Entry Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
                horizontal
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                axisLine={false}
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }}
              />
              <YAxis
                domain={[0, 6000]}
                ticks={[0, 1500, 3000, 4500, 6000]}
                tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                axisLine={false}
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "var(--radius)",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                }}
                formatter={(value) =>
                  value != null ? Number(value).toLocaleString() : "—"
                }
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend
                align="right"
                verticalAlign="top"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingBottom: 8 }}
                formatter={(value) => (
                  <span
                    className={
                      value === "revenue" ? "text-teal-400" : "text-sky-400"
                    }
                  >
                    {value === "revenue" ? "Revenue ($)" : "Entries"}
                  </span>
                )}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                name="revenue"
                stroke={REVENUE_COLOR}
                strokeWidth={2}
                dot={{ fill: "white", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: REVENUE_COLOR, stroke: "white", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="entries"
                name="entries"
                stroke={ENTRIES_COLOR}
                strokeWidth={2}
                dot={{ fill: "white", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: ENTRIES_COLOR, stroke: "white", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
