"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import PageLimit from "@/components/common/pagelimit/PageLimit"
import type { PaginationData } from "@/components/common/pagelimit/PageLimit"
import { cn } from "@/lib/utils"

type Transaction = {
  id: string
  userName: string
  userEmail: string
  plan: string
  amount: string
  status: "Completed" | "Pending" | "Failed"
  paymentDate: string
  expiryDate: string
}

const transactions: Transaction[] = [
  {
    id: "TXN-10234",
    userName: "John Smith",
    userEmail: "john.smith@email.com",
    plan: "PinLinks Club Member",
    amount: "$12.99",
    status: "Completed",
    paymentDate: "Jun 12, 2024",
    expiryDate: "Jun 12, 2025",
  },
  {
    id: "TXN-10233",
    userName: "Emma Wilson",
    userEmail: "emma.wilson@email.com",
    plan: "PinLinks Club Member",
    amount: "$12.99",
    status: "Completed",
    paymentDate: "Jun 11, 2024",
    expiryDate: "Jul 11, 2024",
  },
  {
    id: "TXN-10232",
    userName: "Michael Brown",
    userEmail: "michael.brown@email.com",
    plan: "PinLinks Club Member",
    amount: "$12.99",
    status: "Completed",
    paymentDate: "Jun 10, 2024",
    expiryDate: "Jun 10, 2025",
  },
  {
    id: "TXN-10231",
    userName: "Sarah Davis",
    userEmail: "sarah.davis@email.com",
    plan: "Creator / Business",
    amount: "$24.99",
    status: "Completed",
    paymentDate: "Jun 9, 2024",
    expiryDate: "Jun 9, 2025",
  },
  {
    id: "TXN-10230",
    userName: "James Anderson",
    userEmail: "james.anderson@email.com",
    plan: "PinLinks Club Member",
    amount: "$12.99",
    status: "Completed",
    paymentDate: "Jun 8, 2024",
    expiryDate: "Jun 8, 2025",
  },
]

function StatusBadge({ status }: { status: Transaction["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2.5 py-0.5 text-xs font-medium",
        status === "Completed" && "bg-emerald-500/90 text-white",
        status === "Pending" && "bg-amber-500/80 text-white",
        status === "Failed" && "bg-red-500/80 text-white"
      )}
    >
      {status}
    </span>
  )
}

export default function TransactionTable() {
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    pageSize: 10,
    totalCount: 5,
  })

  return (
    <Card className="overflow-hidden rounded-3xl border border-emerald-900/50 bg-emerald-950/30 shadow-none">
      <Table>
        <TableHeader>
          <TableRow className="border-emerald-800/50 bg-emerald-900/40 hover:bg-emerald-900/40">
            <TableHead className="text-zinc-300 font-medium">
              Transaction ID
            </TableHead>
            <TableHead className="text-zinc-300 font-medium">User</TableHead>
            <TableHead className="text-zinc-300 font-medium">Plan</TableHead>
            <TableHead className="text-zinc-300 font-medium text-right">
              Amount
            </TableHead>
            <TableHead className="text-zinc-300 font-medium">Status</TableHead>
            <TableHead className="text-zinc-300 font-medium">
              Payment Date
            </TableHead>
            <TableHead className="text-zinc-300 font-medium">
              Expiry Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((txn, index) => (
            <TableRow
              key={txn.id}
              className={cn(
                "border-emerald-800/30",
                index % 2 === 0 ? "bg-emerald-950/20" : "bg-emerald-900/10",
                "hover:bg-emerald-900/30"
              )}
            >
              <TableCell className="font-mono text-sm text-zinc-200">
                {txn.id}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-white">{txn.userName}</span>
                  <span className="text-xs text-zinc-400">{txn.userEmail}</span>
                </div>
              </TableCell>
              <TableCell className="text-zinc-300">{txn.plan}</TableCell>
              <TableCell className="text-right text-zinc-200 font-medium">
                {txn.amount}
              </TableCell>
              <TableCell>
                <StatusBadge status={txn.status} />
              </TableCell>
              <TableCell className="text-zinc-300">{txn.paymentDate}</TableCell>
              <TableCell className="text-zinc-300">{txn.expiryDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-emerald-800/50 bg-emerald-900/20 px-4 py-3">
        <PageLimit
          pagination={pagination}
          onPaginationChange={setPagination}
          itemLabel="transactions"
        />
      </div>
    </Card>
  )
}
