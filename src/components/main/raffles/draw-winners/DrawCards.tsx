"use client"

import { Calendar, Users, Play, Trophy, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type DrawCardProps = {
  entryFee: string
  endDate: string
  totalEntries: string
  status: "pending" | "completed"
  drawnDate?: string
  winnerName?: string
  winnerEmail?: string
  onDrawWinner?: () => void
}

export default function DrawCard({
  entryFee,
  endDate,
  totalEntries,
  status,
  drawnDate,
  winnerName,
  winnerEmail,
  onDrawWinner,
}: DrawCardProps) {
  const isPending = status === "pending"

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-8 rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 p-6",
        "transition-colors hover:bg-emerald-900/30"
      )}
    >
      <div
        className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-lg",
          isPending ? "bg-orange-500" : "bg-emerald-500"
        )}
      >
        <Trophy className="size-7 text-white" strokeWidth={2} />
      </div>

      <div className="flex flex-1 flex-wrap items-center gap-10 min-w-0">
        <div className="min-w-[80px] space-y-1">
          <p className="text-xs text-zinc-500">Entry Fee</p>
          <p className="text-base font-semibold text-white">{entryFee}</p>
        </div>
        <div className="flex items-center gap-2 min-w-[120px]">
          <Calendar className="size-4 text-zinc-500 shrink-0" />
          <div className="space-y-1">
            <p className="text-xs text-zinc-500">End Date</p>
            <p className="text-base font-semibold text-white">{endDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 min-w-[100px]">
          <Users className="size-4 text-zinc-500 shrink-0" />
          <div className="space-y-1">
            <p className="text-xs text-zinc-500">Total Entries</p>
            <p className="text-base font-semibold text-white">{totalEntries}</p>
          </div>
        </div>
        {!isPending && drawnDate && (
          <div className="min-w-[100px] space-y-1">
            <p className="text-xs text-zinc-500">Drawn Date</p>
            <p className="text-base font-semibold text-white">{drawnDate}</p>
          </div>
        )}
      </div>

      {isPending && onDrawWinner && (
        <Button
          className="bg-emerald-600 text-white hover:bg-emerald-500 gap-2 shrink-0 px-5 py-2.5"
          onClick={onDrawWinner}
        >
          <Play className="size-4" />
          Draw Winner
        </Button>
      )}

      {!isPending && (winnerName || winnerEmail) && (
        <div className="flex items-center gap-4 rounded-lg border border-emerald-800/50 bg-emerald-900/40 px-5 py-4 shrink-0 min-w-[220px]">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-emerald-100">
            <User className="size-5" strokeWidth={2} />
          </div>
          <div className="min-w-0 space-y-0.5">
            <p className="text-xs text-zinc-500">Winner</p>
            <p className="font-semibold text-white truncate">{winnerName}</p>
            <p className="text-sm text-zinc-400 truncate">{winnerEmail}</p>
          </div>
        </div>
      )}
    </div>
  )
}
