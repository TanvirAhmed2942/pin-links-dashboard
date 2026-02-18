"use client"

import DetailCard from "./DetailCard"
import Link from "next/link"

type TournamentParticipationCardProps = {
  tournamentCount: number
  tournaments: string[]
}

export default function TournamentParticipationCard({
  tournamentCount,
  tournaments,
}: TournamentParticipationCardProps) {
  return (
    <DetailCard
      title="Tournament Participation"
      subtitle={`${tournamentCount} tournament${tournamentCount !== 1 ? "s" : ""}`}
    >
      <div className="flex flex-wrap gap-2">
        {tournaments.map((name, index) => (
          <Link
            key={`${name}-${index}`}
            href="#"
            className="rounded-lg bg-emerald-800/50 px-3 py-1.5 text-sm text-zinc-200 hover:bg-emerald-700/50 hover:text-white transition-colors"
          >
            {name}
          </Link>
        ))}
      </div>
    </DetailCard>
  )
}
