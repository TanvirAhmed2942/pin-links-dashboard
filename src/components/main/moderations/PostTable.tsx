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
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type Post = {
    id: string
    user: string
    contentType: "Scorecard" | "Tournament" | "Post"
    reports: number
    reportReason: string
    status: "Reported" | "Removed"
    date: string
}

const posts: Post[] = [
    {
        id: "PST-1001",
        user: "John Smith",
        contentType: "Scorecard",
        reports: 4,
        reportReason: "Inappropriate language detected...",
        status: "Reported",
        date: "Jun 15, 2024",
    },
    {
        id: "PST-1001",
        user: "John Smith",
        contentType: "Tournament",
        reports: 3,
        reportReason: "Spam content promoting",
        status: "Removed",
        date: "Jun 15, 2024",
    },
    {
        id: "PST-1001",
        user: "John Smith",
        contentType: "Post",
        reports: 3,
        reportReason: "Spam content promoting",
        status: "Removed",
        date: "Jun 15, 2024",
    },
]

function ReportsBadge({ count }: { count: number }) {
    return (
        <span
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-medium text-white"
            aria-label={`${count} reports`}
        >
            {count}
        </span>
    )
}

function StatusBadge({ status }: { status: Post["status"] }) {
    return (
        <span
            className={cn(
                "inline-flex rounded-md px-2.5 py-0.5 text-xs font-medium uppercase",
                status === "Reported" && "bg-red-500/90 text-white",
                status === "Removed" && "bg-zinc-400/80 text-zinc-900"
            )}
        >
            {status}
        </span>
    )
}

export default function PostTable() {
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        pageSize: 10,
        totalCount: 20,
    })

    return (
        <Card className="overflow-hidden rounded-3xl border-2 border-emerald-900/50 bg-card py-0 shadow-none">
            <Table>
                <TableHeader>
                    <TableRow className="border-emerald-800/50 bg-emerald-900/40 hover:bg-emerald-900/40">
                        <TableHead className="text-zinc-300 font-medium">Post ID</TableHead>
                        <TableHead className="text-zinc-300 font-medium">User</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Content Type</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Reports</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Report Reason</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Status</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Date</TableHead>
                        <TableHead className="text-zinc-300 font-medium text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post, index) => (
                        <TableRow
                            key={`${post.id}-${post.contentType}-${index}`}
                            className={cn(
                                "border-emerald-800/30",
                                index % 2 === 0 ? "bg-emerald-950/20" : "bg-emerald-900/10",
                                "hover:bg-emerald-900/30"
                            )}
                        >
                            <TableCell className="font-mono text-sm text-zinc-200">
                                {post.id}
                            </TableCell>
                            <TableCell className="text-white">{post.user}</TableCell>
                            <TableCell className="text-zinc-300">{post.contentType}</TableCell>
                            <TableCell>
                                <ReportsBadge count={post.reports} />
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate text-zinc-300">
                                {post.reportReason}
                            </TableCell>
                            <TableCell>
                                <StatusBadge status={post.status} />
                            </TableCell>
                            <TableCell className="text-zinc-300">{post.date}</TableCell>
                            <TableCell className="text-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                        "size-8 rounded-full",
                                        post.status === "Reported"
                                            ? "bg-red-500/90 text-white hover:bg-red-500 hover:text-white"
                                            : "bg-zinc-400/80 text-zinc-900 hover:bg-zinc-400/70 hover:text-zinc-900"
                                    )}
                                    aria-label={post.status === "Reported" ? "Resolve report" : "Content removed"}
                                >
                                    <X className="size-4" />
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
                    itemLabel="posts"
                />
            </div>
        </Card>
    )
}
