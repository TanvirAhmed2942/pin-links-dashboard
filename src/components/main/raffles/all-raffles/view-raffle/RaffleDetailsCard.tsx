"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export type RaffleDetailsData = {
  status: "active" | "ended" | "drawn" | "draft"
  eligibility: string
  startDate: string
  endDate: string
}

const statusConfig = {
  active: "bg-emerald-500 text-white",
  ended: "bg-orange-500 text-white",
  drawn: "bg-blue-500 text-white",
  draft: "bg-zinc-500/80 text-zinc-900",
}

export default function RaffleDetailsCard({ data }: { data: RaffleDetailsData }) {
  return (
    <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white">Raffle Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div>
          <p className="text-xs text-zinc-500 mb-1">Status</p>
          <span
            className={cn(
              "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium uppercase",
              statusConfig[data.status]
            )}
          >
            {data.status}
          </span>
        </div>
        <div>
          <p className="text-xs text-zinc-500 mb-1">Eligibility</p>
          <span className="inline-flex rounded-full bg-emerald-500/80 px-2.5 py-0.5 text-xs font-medium text-white">
            {data.eligibility}
          </span>
        </div>
        <div>
          <p className="text-xs text-zinc-500 mb-1">Duration</p>
          <span className="inline-flex items-center gap-1.5 text-sm text-zinc-200">
            <Calendar className="size-4 text-zinc-500" />
            {data.startDate} to {data.endDate}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
