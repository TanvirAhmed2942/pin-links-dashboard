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

type ReportRow = {
  reason: string
  date: string
  userName: string
}

type ReportContentCardProps = {
  reportCount: number
  rows: ReportRow[]
}

export default function ReportContentCard({ reportCount, rows }: ReportContentCardProps) {
  return (
    <DetailCard title="Report Content" subtitle={`${reportCount} report${reportCount !== 1 ? "s" : ""}`}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-emerald-800/50 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium">Reason</TableHead>
              <TableHead className="text-zinc-400 font-medium">Date</TableHead>
              <TableHead className="text-zinc-400 font-medium">User Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} className="border-emerald-800/30">
                <TableCell className="text-zinc-200">{row.reason}</TableCell>
                <TableCell className="text-zinc-300">{row.date}</TableCell>
                <TableCell className="text-zinc-300">{row.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DetailCard>
  )
}
