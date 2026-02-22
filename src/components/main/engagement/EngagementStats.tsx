"use client"

import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Avg Daily Active Users", value: "3,702" },
  { label: "Total Interactions", value: "6,125" },
  { label: "User Retention Rate", value: "48%" },
]

export default function EngagementStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((item) => (
        <Card
          key={item.label}
          className="rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 p-4 shadow-none"
        >
          <CardContent className="p-0">
            <p className="text-sm font-medium text-zinc-400">{item.label}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-400">
              {item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
