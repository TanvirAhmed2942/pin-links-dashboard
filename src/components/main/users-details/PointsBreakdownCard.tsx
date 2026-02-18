"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DetailCard from "./DetailCard"

type PointsRow = {
  activity: string
  points: string
  date: string
}

type PointsBreakdownCardProps = {
  totalPoints: string
  rows: PointsRow[]
}

export default function PointsBreakdownCard({ totalPoints, rows }: PointsBreakdownCardProps) {
  return (
    <DetailCard title="Points Breakdown" subtitle={`${totalPoints} points`}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-emerald-800/50 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium">Activity</TableHead>
              <TableHead className="text-zinc-400 font-medium text-right">Points</TableHead>
              <TableHead className="text-zinc-400 font-medium">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} className="border-emerald-800/30">
                <TableCell className="text-zinc-200">{row.activity}</TableCell>
                <TableCell className="text-right text-emerald-400 font-medium">
                  {row.points}
                </TableCell>
                <TableCell className="text-zinc-300">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DetailCard>
  )
}
