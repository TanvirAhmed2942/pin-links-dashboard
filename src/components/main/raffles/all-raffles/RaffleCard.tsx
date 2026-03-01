"use client"

import {
  Trophy,
  Calendar,
  DollarSign,
  Users,
  Eye,
  Pencil,
  Play,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export type RaffleStatus = "active" | "ended" | "drawn" | "draft"

export type RaffleCardProps = {
  title: string
  startDate: string
  endDate: string
  price: string
  entries: number
  maxEntries: number
  status: RaffleStatus
  accessType?: string
  onView?: () => void
  onEdit?: () => void
  onDrawWinner?: () => void
  onDelete?: () => void
}

const statusConfig: Record<
  RaffleStatus,
  { label: string; className: string }
> = {
  active: {
    label: "ACTIVE",
    className: "bg-emerald-500 text-white",
  },
  ended: {
    label: "ENDED",
    className: "bg-orange-500 text-white",
  },
  drawn: {
    label: "DRAWN",
    className: "bg-blue-500 text-white",
  },
  draft: {
    label: "DRAFT",
    className: "bg-zinc-500/80 text-zinc-900",
  },
}

export default function RaffleCard({
  title,
  startDate,
  endDate,
  price,
  entries,
  maxEntries,
  status,
  accessType = "Club Only",
  onView,
  onEdit,
  onDrawWinner,
  onDelete,
}: RaffleCardProps) {
  const percentFilled =
    maxEntries > 0 ? Math.min(100, (entries / maxEntries) * 100) : 0
  const config = statusConfig[status]

  return (
    <div className="flex flex-col rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 p-4 shadow-none">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3 min-w-0">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-700/50 text-emerald-400">
            <Trophy className="size-5" strokeWidth={2} />
          </div>
          <div className="min-w-0 space-y-1">
            <h3 className="font-semibold text-white truncate">{title}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-sm text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3.5" />
                {startDate} - {endDate}
              </span>
              <span className="inline-flex items-center gap-1">
                <DollarSign className="size-3.5" />
                {price}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-zinc-400">
              <Users className="size-3.5" />
              {entries} / {maxEntries} entries
            </div>
          </div>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <span
            className={cn(
              "inline-flex rounded-md px-2 py-0.5 text-xs font-medium uppercase",
              config.className
            )}
          >
            {config.label}
          </span>
          <span className="inline-flex rounded-md bg-zinc-500/60 px-2 py-0.5 text-xs font-medium text-zinc-900">
            {accessType}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <Progress
          value={percentFilled}
          className="h-1.5 bg-emerald-900/60 **:data-[slot=progress-indicator]:bg-emerald-500"
        />
        <p className="text-xs text-zinc-400">
          {percentFilled.toFixed(1)}% filled
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
        {status === "ended" && onDrawWinner && (
          <Button
            variant="ghost"
            size="sm"
            className="text-emerald-400 hover:bg-emerald-800/40 hover:text-emerald-300"
            onClick={onDrawWinner}
          >
            <Play className="size-4 mr-1" />
            Draw Winner
          </Button>
        )}
        {onView && (
          <Button
            variant="ghost"
            size="sm"
            className="text-emerald-400 hover:bg-emerald-800/40 hover:text-emerald-300"
            onClick={onView}
          >
            <Eye className="size-4 mr-1" />
            View
          </Button>
        )}
        {status !== "drawn" && onEdit && (
          <Button
            variant="ghost"
            size="sm"
            className="text-emerald-400 hover:bg-emerald-800/40 hover:text-emerald-300"
            onClick={onEdit}
          >
            <Pencil className="size-4 mr-1" />
            Edit
          </Button>
        )}
        {status === "draft" && onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
            onClick={onDelete}
          >
            <Trash2 className="size-4 mr-1" />
            Delete
          </Button>
        )}
      </div>
    </div>
  )
}
