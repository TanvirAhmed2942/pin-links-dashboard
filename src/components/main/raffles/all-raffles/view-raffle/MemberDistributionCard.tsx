"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

export type MemberDistributionData = {
  clubMembers: number
  freeMembers: number
}

const COLORS = ["#10b981", "#34d399"]

export default function MemberDistributionCard({
  data,
}: { data: MemberDistributionData }) {
  const chartData = [
    { name: "Club Members", value: data.clubMembers, fill: COLORS[0] },
    { name: "Free Members", value: data.freeMembers, fill: COLORS[1] },
  ]

  return (
    <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white">Member Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-zinc-300">Club Members</span>
            <span className="text-sm font-medium text-white">{data.clubMembers}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-emerald-400" />
            <span className="text-sm text-zinc-300">Free Members</span>
            <span className="text-sm font-medium text-white">{data.freeMembers}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
