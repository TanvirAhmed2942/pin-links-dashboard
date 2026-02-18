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
import { cn } from "@/lib/utils"

type HistoryRow = {
  plan: string
  startDate: string
  endDate: string
  amount: string
  status: "Active" | "Completed"
}

type SubscriptionHistoryCardProps = {
  rows: HistoryRow[]
}

export default function SubscriptionHistoryCard({ rows }: SubscriptionHistoryCardProps) {
  return (
    <DetailCard title="Subscription History">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-emerald-800/50 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium">Plan</TableHead>
              <TableHead className="text-zinc-400 font-medium">Start Date</TableHead>
              <TableHead className="text-zinc-400 font-medium">End Date</TableHead>
              <TableHead className="text-zinc-400 font-medium">Amount</TableHead>
              <TableHead className="text-zinc-400 font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} className="border-emerald-800/30">
                <TableCell className="text-zinc-200">{row.plan}</TableCell>
                <TableCell className="text-zinc-300">{row.startDate}</TableCell>
                <TableCell className="text-zinc-300">{row.endDate}</TableCell>
                <TableCell className="text-zinc-300">{row.amount}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-xs",
                      row.status === "Active" &&
                        "bg-emerald-500/80 text-white",
                      row.status === "Completed" &&
                        "bg-zinc-500/40 text-zinc-300"
                    )}
                  >
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DetailCard>
  )
}
