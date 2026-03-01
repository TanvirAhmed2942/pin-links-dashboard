"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign, User, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export type ViewRaffleStatsData = {
  totalEntries: number
  totalRevenue: string
  clubMembers: number
  avgDailyEntries: number
}

const statsConfig = [
  { key: "totalEntries" as const, label: "Total Entries", icon: Users, iconBg: "bg-blue-500" },
  { key: "totalRevenue" as const, label: "Total Revenue", icon: DollarSign, iconBg: "bg-emerald-500" },
  { key: "clubMembers" as const, label: "Club Members", icon: User, iconBg: "bg-blue-500" },
  { key: "avgDailyEntries" as const, label: "Avg Daily Entries", icon: TrendingUp, iconBg: "bg-orange-500" },
]

export default function ViewRaffleStats({ data }: { data: ViewRaffleStatsData }) {
  const values = {
    totalEntries: data.totalEntries.toLocaleString(),
    totalRevenue: data.totalRevenue,
    clubMembers: String(data.clubMembers),
    avgDailyEntries: String(data.avgDailyEntries),
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsConfig.map(({ key, label, icon: Icon, iconBg }) => (
        <Card
          key={key}
          className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden"
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg text-white",
                  iconBg
                )}
              >
                <Icon className="size-5" strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-zinc-400">{label}</span>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-white">
              {values[key]}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
