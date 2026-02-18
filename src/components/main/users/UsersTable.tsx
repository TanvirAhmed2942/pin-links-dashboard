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
import Link from "next/link"
import { Eye, Ban } from "lucide-react"
import { cn } from "@/lib/utils"

type User = {
    id: string
    name: string
    email: string
    handicap: string
    subscription: "Pro" | "Free"
    points: string
    joinDate: string
    lastActive: string
    status: "active" | "inactive" | "Suspended"
}

const users: User[] = [
    {
        id: "USR-001",
        name: "John Smith",
        email: "john.smith@email.com",
        handicap: "12.4",
        subscription: "Pro",
        points: "2,450",
        joinDate: "Jan 15, 2024",
        lastActive: "2 hours ago",
        status: "active",
    },
    {
        id: "USR-002",
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        handicap: "18.2",
        subscription: "Free",
        points: "890",
        joinDate: "Feb 3, 2024",
        lastActive: "1 day ago",
        status: "active",
    },
    {
        id: "USR-003",
        name: "Michael Brown",
        email: "michael.brown@email.com",
        handicap: "22.1",
        subscription: "Pro",
        points: "1,120",
        joinDate: "Mar 12, 2024",
        lastActive: "3 hours ago",
        status: "inactive",
    },
    {
        id: "USR-004",
        name: "Sarah Davis",
        email: "sarah.davis@email.com",
        handicap: "8.5",
        subscription: "Pro",
        points: "3,200",
        joinDate: "Jan 28, 2024",
        lastActive: "5 hours ago",
        status: "active",
    },
    {
        id: "USR-005",
        name: "James Anderson",
        email: "james.anderson@email.com",
        handicap: "15.0",
        subscription: "Free",
        points: "560",
        joinDate: "Apr 5, 2024",
        lastActive: "1 week ago",
        status: "Suspended",
    },
    {
        id: "USR-006",
        name: "Olivia Martinez",
        email: "olivia.martinez@email.com",
        handicap: "20.3",
        subscription: "Pro",
        points: "2,100",
        joinDate: "Feb 18, 2024",
        lastActive: "1 day ago",
        status: "active",
    },
    {
        id: "USR-007",
        name: "William Taylor",
        email: "william.taylor@email.com",
        handicap: "11.7",
        subscription: "Free",
        points: "720",
        joinDate: "Mar 22, 2024",
        lastActive: "4 hours ago",
        status: "inactive",
    },
    {
        id: "USR-008",
        name: "Sophia Thomas",
        email: "sophia.thomas@email.com",
        handicap: "25.0",
        subscription: "Free",
        points: "430",
        joinDate: "Apr 10, 2024",
        lastActive: "2 days ago",
        status: "active",
    },
    {
        id: "USR-009",
        name: "Benjamin Lee",
        email: "benjamin.lee@email.com",
        handicap: "9.2",
        subscription: "Pro",
        points: "2,890",
        joinDate: "Jan 8, 2024",
        lastActive: "30 min ago",
        status: "active",
    },
    {
        id: "USR-010",
        name: "David Johnson",
        email: "david.johnson@email.com",
        handicap: "14.6",
        subscription: "Pro",
        points: "1,950",
        joinDate: "Feb 25, 2024",
        lastActive: "6 hours ago",
        status: "active",
    },
]

function SubscriptionBadge({ value }: { value: User["subscription"] }) {
    return (
        <span
            className={cn(
                "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                value === "Pro" &&
                "bg-emerald-200/90 text-emerald-800 dark:bg-emerald-400/30 dark:text-emerald-300",
                value === "Free" &&
                "bg-zinc-200 text-zinc-700 dark:bg-zinc-500/30 dark:text-zinc-300"
            )}
        >
            {value}
        </span>
    )
}

function StatusBadge({ value }: { value: User["status"] }) {
    return (
        <span
            className={cn(
                "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                value === "active" &&
                "bg-emerald-500/80 text-white dark:bg-emerald-500 dark:text-white",
                value === "inactive" &&
                "bg-violet-400/30 text-violet-200 dark:bg-violet-500/30 dark:text-violet-300",
                value === "Suspended" &&
                "bg-red-500/90 text-white dark:bg-red-500 dark:text-white"
            )}
        >
            {value}
        </span>
    )
}

export default function UsersTable() {
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        pageSize: 10,
        totalCount: 120,
    })

    return (
        <Card className="overflow-hidden rounded-3xl border bg-card shadow-none py-0">
            <Table>
                <TableHeader>
                    <TableRow className=" ">
                        <TableHead className="text-zinc-300 font-medium">User ID</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Name</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Email</TableHead>
                        <TableHead className="text-zinc-300 font-medium text-right">Handicap</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Subscription</TableHead>
                        <TableHead className="text-zinc-300 font-medium text-right">Points</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Join Date</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Last Active</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Status</TableHead>
                        <TableHead className="text-zinc-300 font-medium text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow
                            key={user.id}
                            className={cn(
                                "border-emerald-800/30 transition-colors",
                                index % 2 === 0 ? "bg-emerald-950/20" : "bg-emerald-900/10",
                                "hover:bg-emerald-900/30"
                            )}
                        >
                            <TableCell className="text-zinc-200 font-mono text-sm">{user.id}</TableCell>
                            <TableCell className="text-zinc-200">{user.name}</TableCell>
                            <TableCell className="text-zinc-300">{user.email}</TableCell>
                            <TableCell className="text-right text-zinc-200">{user.handicap}</TableCell>
                            <TableCell>
                                <SubscriptionBadge value={user.subscription} />
                            </TableCell>
                            <TableCell className="text-right text-zinc-200">{user.points}</TableCell>
                            <TableCell className="text-zinc-300">{user.joinDate}</TableCell>
                            <TableCell className="text-zinc-400">{user.lastActive}</TableCell>
                            <TableCell>
                                <StatusBadge value={user.status} />
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-emerald-800/40"
                                        aria-label="View user"
                                        asChild
                                    >
                                        <Link href={`/dashboard/users/${user.id}`}>
                                            <Eye className="size-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                                        aria-label="Block user"
                                    >
                                        <Ban className="size-4" />
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
                    itemLabel="users"
                />
            </div>
        </Card>
    )
}
