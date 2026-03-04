"use client"

import React from "react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DATA = [
  { category: "Woods", value: 4000 },
  { category: "Putter", value: 2000 },
  { category: "Irons", value: 1500 },
  { category: "Wedges", value: 1000 },
]

const BAR_COLOR = "#047857"

export default function TopGivingCategory() {
  return (
    <Card className="rounded-xl border-2 border-emerald-900/50 bg-card shadow-none overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white text-xl font-semibold">
          Top Giving Category
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={DATA}
              layout="vertical"
              margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
            >
              <XAxis
                type="number"
                domain={[0, 4000]}
                ticks={[0, 1000, 2000, 4000]}
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }}
                tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
              />
              <YAxis
                type="category"
                dataKey="category"
                width={60}
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.9)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
              />
              <Bar
                dataKey="value"
                fill={BAR_COLOR}
                radius={[0, 4, 4, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
