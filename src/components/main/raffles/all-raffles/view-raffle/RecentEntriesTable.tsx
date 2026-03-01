"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { cn } from "@/lib/utils"

export type EntryRow = {
  userName: string
  email: string
  type: string
  date: string
  amount: string
  status: string
}

type RecentEntriesTableProps = {
  entries: EntryRow[]
  totalCount: number
  raffleId: string
}

export default function RecentEntriesTable({
  entries,
  totalCount,
  raffleId,
}: RecentEntriesTableProps) {
  return (
    <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white">Recent Entries</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          <TableHeader>
            <TableRow className="border-emerald-800/50 bg-emerald-900/40 hover:bg-emerald-900/40">
              <TableHead className="text-zinc-300 font-medium">User</TableHead>
              <TableHead className="text-zinc-300 font-medium">Type</TableHead>
              <TableHead className="text-zinc-300 font-medium">Date</TableHead>
              <TableHead className="text-zinc-300 font-medium">Amount</TableHead>
              <TableHead className="text-zinc-300 font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((row, i) => (
              <TableRow
                key={i}
                className="border-emerald-800/30 hover:bg-emerald-900/20"
              >
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-white">{row.userName}</span>
                    <span className="text-xs text-zinc-500">{row.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex rounded-full bg-emerald-500/80 px-2.5 py-0.5 text-xs font-medium text-white">
                    {row.type}
                  </span>
                </TableCell>
                <TableCell className="text-zinc-300">{row.date}</TableCell>
                <TableCell className="text-zinc-300">{row.amount}</TableCell>
                <TableCell>
                  <span className="inline-flex rounded-full bg-emerald-500/80 px-2.5 py-0.5 text-xs font-medium text-white">
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link
          href={`/dashboard/raffles/all-raffles/${raffleId}/entries`}
          className="mt-3 inline-block text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          View all {totalCount.toLocaleString()} entries →
        </Link>
      </CardContent>
    </Card>
  )
}
