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
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PageLimit from "@/components/common/pagelimit/PageLimit"
import type { PaginationData } from "@/components/common/pagelimit/PageLimit"
import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

type ReportStatus = "In Progress" | "Open" | "Resolved"

type Report = {
    id: string
    reportReason: string
    reportedBy: string
    status: ReportStatus
    createdDate: string
}

const reports: Report[] = [
    {
        id: "301",
        reportReason: "Scorecard not saving correctly",
        reportedBy: "John Smith",
        status: "In Progress",
        createdDate: "Jun 14, 2024",
    },
    {
        id: "302",
        reportReason: "Tournament leaderboard showing incorrect scores",
        reportedBy: "Emma Wilson",
        status: "Open",
        createdDate: "Jun 15, 2024",
    },
    {
        id: "303",
        reportReason: "Course rating not updating",
        reportedBy: "Michael Brown",
        status: "Resolved",
        createdDate: "Jun 12, 2024",
    },
    {
        id: "304",
        reportReason: "Push notifications not working on iOS",
        reportedBy: "Sarah Davis",
        status: "In Progress",
        createdDate: "Jun 13, 2024",
    },
    {
        id: "305",
        reportReason: "Profile picture upload fails",
        reportedBy: "David Johnson",
        status: "Open",
        createdDate: "Jun 11, 2024",
    },
    {
        id: "306",
        reportReason: "Handicap calculation showing wrong value",
        reportedBy: "Lisa Anderson",
        status: "Resolved",
        createdDate: "Jun 10, 2024",
    },
]

function StatusBadge({ status }: { status: ReportStatus }) {
    return (
        <span
            className={cn(
                "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white",
                status === "In Progress" && "bg-amber-500",
                status === "Open" && "bg-red-500",
                status === "Resolved" && "bg-emerald-500"
            )}
        >
            {status}
        </span>
    )
}

export default function ReportsTable() {
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        pageSize: 10,
        totalCount: 20,
    })
    const router = useRouter()
    return (
        <Card className="overflow-hidden rounded-3xl border-2 border-emerald-900/50 bg-card py-0 shadow-none">
            <Table>
                <TableHeader>
                    <TableRow className="border-emerald-800/50 bg-emerald-900/40 hover:bg-emerald-900/40">
                        <TableHead className="text-zinc-300 font-medium">
                            Report ID
                        </TableHead>
                        <TableHead className="text-zinc-300 font-medium">
                            Report Reason
                        </TableHead>
                        <TableHead className="text-zinc-300 font-medium">
                            Reported By
                        </TableHead>
                        <TableHead className="text-zinc-300 font-medium text-center">
                            Status
                        </TableHead>
                        <TableHead className="text-zinc-300 font-medium">
                            Created Date
                        </TableHead>
                        <TableHead className="text-zinc-300 font-medium text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reports.map((report, index) => (
                        <TableRow
                            key={report.id}
                            className={cn(
                                "border-emerald-800/30",
                                index % 2 === 0 ? "bg-emerald-950/20" : "bg-emerald-900/10",
                                "hover:bg-emerald-900/30"
                            )}
                        >
                            <TableCell className="font-mono text-sm text-zinc-200">
                                {report.id}
                            </TableCell>
                            <TableCell className="text-white">
                                {report.reportReason}
                            </TableCell>
                            <TableCell className="text-zinc-300">{report.reportedBy}</TableCell>
                            <TableCell className="text-center">
                                <StatusBadge status={report.status} />
                            </TableCell>
                            <TableCell className="text-zinc-300">
                                {report.createdDate}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-emerald-800/40"
                                    aria-label="View report"
                                    onClick={() => router.push(`/dashboard/reports/${report.id}`)}
                                >
                                    <Eye className="size-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-emerald-800/50 bg-emerald-900/20 px-4 py-3">
                <PageLimit
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    itemLabel="reports"
                />
            </div>
        </Card>
    )
}
