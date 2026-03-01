"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export type RaffleProgressData = {
  entries: number
  maxEntries: number
}

export default function RaffleProgressCard({ data }: { data: RaffleProgressData }) {
  const percentFilled =
    data.maxEntries > 0
      ? Math.min(100, (data.entries / data.maxEntries) * 100)
      : 0

  return (
    <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white">Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-zinc-400">Entries</span>
          <span className="text-sm font-medium text-white">
            {data.entries.toLocaleString()} / {data.maxEntries.toLocaleString()}
          </span>
        </div>
        <Progress
          value={percentFilled}
          className="h-2 bg-emerald-900/60 **:data-[slot=progress-indicator]:bg-emerald-500"
        />
        <p className="text-xs text-zinc-400">
          {percentFilled.toFixed(1)}% filled
        </p>
      </CardContent>
    </Card>
  )
}
