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
import { Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Tournament = {
    id: string
    name: string
    creator: string
    status: "Active" | "Inactive" | "Pending"
    startDate: string
    endDate: string
}

const mockTournaments: Tournament[] = [
    {
        id: "TRN-001",
        name: "Summer Championship 2024",
        creator: "Golf Club Pro",
        status: "Active",
        startDate: "Jul 1, 2024",
        endDate: "Jul 15, 2024",
    },
    {
        id: "TRN-002",
        name: "Fall Open",
        creator: "PGA Events",
        status: "Pending",
        startDate: "Sep 10, 2024",
        endDate: "Sep 12, 2024",
    },
    {
        id: "TRN-003",
        name: "Winter Invitational",
        creator: "Elite Golf Co",
        status: "Inactive",
        startDate: "Jan 5, 2024",
        endDate: "Jan 7, 2024",
    },
    {
        id: "TRN-004",
        name: "Spring Masters",
        creator: "Golf Club Pro",
        status: "Active",
        startDate: "Apr 20, 2024",
        endDate: "Apr 22, 2024",
    },
    {
        id: "TRN-005",
        name: "Charity Classic",
        creator: "Community Links",
        status: "Pending",
        startDate: "Aug 15, 2024",
        endDate: "Aug 17, 2024",
    },
]

function StatusBadge({ status }: { status: Tournament["status"] }) {
    return (
        <span
            className={cn(
                "inline-flex rounded-md px-2.5 py-0.5 text-xs font-medium",
                status === "Active" && "bg-emerald-500/90 text-white",
                status === "Pending" && "bg-amber-500/80 text-white",
                status === "Inactive" && "bg-zinc-500/80 text-zinc-200"
            )}
        >
            {status}
        </span>
    )
}

export default function TournamentsTable() {
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        pageSize: 10,
        totalCount: mockTournaments.length,
    })

    return (
        <Card className="overflow-hidden rounded-3xl border-2 border-emerald-900/50 bg-card py-0 shadow-none">
            <Table>
                <TableHeader>
                    <TableRow className="border-emerald-800/50 bg-emerald-900/40 hover:bg-emerald-900/40">
                        <TableHead className="text-zinc-300 font-medium">
                            Tournament ID
                        </TableHead>
                        <TableHead className="text-zinc-300 font-medium">Name</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Creator</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Status</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Start Date</TableHead>
                        <TableHead className="text-zinc-300 font-medium">End Date</TableHead>
                        <TableHead className="text-zinc-300 font-medium text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockTournaments.map((tournament: Tournament, index: number) => (
                        <TableRow
                            key={tournament.id}
                            className={cn(
                                "border-emerald-800/30",
                                index % 2 === 0 ? "bg-emerald-950/20" : "bg-emerald-900/10",
                                "hover:bg-emerald-900/30"
                            )}
                        >
                            <TableCell className="font-mono text-sm text-zinc-200">
                                {tournament.id}
                            </TableCell>
                            <TableCell className="font-semibold text-white">
                                {tournament.name}
                            </TableCell>
                            <TableCell className="text-zinc-300">{tournament.creator}</TableCell>
                            <TableCell>
                                <StatusBadge status={tournament.status} />
                            </TableCell>
                            <TableCell className="text-zinc-300">
                                {tournament.startDate}
                            </TableCell>
                            <TableCell className="text-zinc-300">
                                {tournament.endDate}
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-emerald-800/40"
                                        aria-label="Edit tournament"
                                    >
                                        <Pencil className="size-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                                        aria-label="Delete tournament"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-emerald-800/50 bg-emerald-900/20 px-4 py-3">
                <PageLimit
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    itemLabel="tournaments"
                />
            </div>
        </Card>
    )
}
