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
import { Switch } from "@/components/ui/switch"
import PageLimit from "@/components/common/pagelimit/PageLimit"
import type { PaginationData } from "@/components/common/pagelimit/PageLimit"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

type Plan = {
    id: string
    name: string
    duration: string
    price: string
    features: string
    activeUsers: string
    active: boolean
}

const plans: Plan[] = [
    {
        id: "PLN-001",
        name: "Free",
        duration: "Lifetime",
        price: "$0.00",
        features: "Basic scorecard, 3 course ratings/month...",
        activeUsers: "3,453",
        active: true,
    },
    {
        id: "PLN-002",
        name: "PinLinks Club Member",
        duration: "1 Year",
        price: "$12.99",
        features: "Unlimited ratings, tournaments, analytics...",
        activeUsers: "892",
        active: true,
    },
    {
        id: "PLN-003",
        name: "Creator / Business",
        duration: "1 Year",
        price: "$24.99",
        features: "All Pro features + priority support",
        activeUsers: "955",
        active: true,
    },
]

export default function PlansTable() {
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        pageSize: 10,
        totalCount: 3,
    })
    const [planStatuses, setPlanStatuses] = useState<Record<string, boolean>>(
        Object.fromEntries(plans.map((p) => [p.id, p.active]))
    )

    const togglePlan = (id: string) => {
        setPlanStatuses((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <Card className="overflow-hidden rounded-3xl border border-emerald-900/50 bg-emerald-950/30 shadow-none py-0">
            <Table>
                <TableHeader>
                    <TableRow className="border-emerald-800/50 bg-emerald-900/40 hover:bg-emerald-900/40">
                        <TableHead className="text-zinc-300 font-medium">Plan ID</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Name</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Duration</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Price</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Features</TableHead>
                        <TableHead className="text-zinc-300 font-medium text-right">
                            Active Users
                        </TableHead>
                        <TableHead className="text-zinc-300 font-medium">Status</TableHead>
                        <TableHead className="text-zinc-300 font-medium text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {plans.map((plan, index) => (
                        <TableRow
                            key={plan.id}
                            className={cn(
                                "border-emerald-800/30",
                                index % 2 === 0 ? "bg-emerald-950/20" : "bg-emerald-900/10",
                                "hover:bg-emerald-900/30"
                            )}
                        >
                            <TableCell className="font-mono text-sm text-zinc-200">
                                {plan.id}
                            </TableCell>
                            <TableCell className="font-semibold text-white">
                                {plan.name}
                            </TableCell>
                            <TableCell className="text-zinc-300">{plan.duration}</TableCell>
                            <TableCell className="text-zinc-200">{plan.price}</TableCell>
                            <TableCell className="max-w-[200px] truncate text-zinc-400">
                                {plan.features}
                            </TableCell>
                            <TableCell className="text-right text-zinc-200">
                                {plan.activeUsers}
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={planStatuses[plan.id] ?? plan.active}
                                    onCheckedChange={() => togglePlan(plan.id)}
                                    className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-zinc-600"
                                />
                            </TableCell>
                            <TableCell className="text-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-emerald-800/40"
                                    aria-label="Edit plan"
                                >
                                    <Pencil className="size-4" />
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
                    itemLabel="plans"
                />
            </div>
        </Card>
    )
}
