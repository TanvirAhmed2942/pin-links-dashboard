"use client"

import { Award } from "lucide-react"
import DetailCard from "./DetailCard"

type GolfStatsCardProps = {
  handicap: string
  totalPoints: string
  tournamentsPlayed: number
}

export default function GolfStatsCard({
  handicap,
  totalPoints,
  tournamentsPlayed,
}: GolfStatsCardProps) {
  return (
    <DetailCard title="Golf Stats" icon={<Award className="size-5 text-sidebar-foreground" />}>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm text-zinc-400">Handicap</p>
          <p className="text-2xl font-bold text-white">{handicap}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Total Points</p>
          <p className="text-2xl font-bold text-white">{totalPoints}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Tournaments Played</p>
          <p className="text-2xl font-bold text-white">{tournamentsPlayed}</p>
        </div>
      </div>
    </DetailCard>
  )
}
