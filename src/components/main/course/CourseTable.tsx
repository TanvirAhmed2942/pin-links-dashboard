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
import { Pencil, Trash2, Star } from "lucide-react"
import { cn } from "@/lib/utils"

type RankRating = { stars: number; value?: string } | null

export type Course = {
    id: string
    name: string
    location: string
    overallFavorite: RankRating
    courseScenary: RankRating
    pinLinks5: boolean
}

const courses: Course[] = [
    {
        id: "CRS-001",
        name: "Pebble Beach Golf Links",
        location: "Pebble Beach, CA",
        overallFavorite: { stars: 5, value: "5.0" },
        courseScenary: { stars: 5 },
        pinLinks5: true,
    },
    {
        id: "CRS-002",
        name: "Augusta National Golf Club",
        location: "Augusta, GA",
        overallFavorite: { stars: 5, value: "5.0" },
        courseScenary: { stars: 5 },
        pinLinks5: true,
    },
    {
        id: "CRS-003",
        name: "St Andrews Old Course",
        location: "St Andrews, Scotland",
        overallFavorite: null,
        courseScenary: null,
        pinLinks5: true,
    },
    {
        id: "CRS-004",
        name: "Cypress Point Club",
        location: "Pebble Beach, CA",
        overallFavorite: { stars: 5, value: "5.0" },
        courseScenary: { stars: 5 },
        pinLinks5: false,
    },
    {
        id: "CRS-005",
        name: "Pine Valley Golf Club",
        location: "Pine Valley, NJ",
        overallFavorite: null,
        courseScenary: null,
        pinLinks5: true,
    },
    {
        id: "CRS-006",
        name: "Shinnecock Hills Golf Club",
        location: "Southampton, NY",
        overallFavorite: { stars: 5, value: "5.0" },
        courseScenary: { stars: 5 },
        pinLinks5: false,
    },
]

function Stars({ count }: { count: number }) {
    return (
        <span className="inline-flex gap-0.5" role="img" aria-label={`${count} stars`}>
            {Array.from({ length: count }).map((_, i) => (
                <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                    strokeWidth={0}
                />
            ))}
        </span>
    )
}

function RankCell({ overallFavorite, courseScenary }: { overallFavorite: RankRating; courseScenary: RankRating }) {
    const hasRating = overallFavorite != null || courseScenary != null
    if (!hasRating) return <span className="text-zinc-500">—</span>

    return (
        <div className="flex flex-col gap-1.5 text-zinc-200">
            {overallFavorite != null && (
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-zinc-400">Overall Favorite</span>
                    <div className="flex items-center gap-1.5">
                        <Stars count={overallFavorite.stars} />
                        {overallFavorite.value != null && (
                            <span className="text-sm">{overallFavorite.value}</span>
                        )}
                    </div>
                </div>
            )}
            {courseScenary != null && (
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-zinc-400">Course Scenary</span>
                    <Stars count={courseScenary.stars} />
                </div>
            )}
        </div>
    )
}

type CourseTableProps = {
    onEditCourse?: (course: Course) => void
}

export default function CourseTable({ onEditCourse }: CourseTableProps) {
    const [pagination, setPagination] = useState<PaginationData>({
        page: 1,
        pageSize: 10,
        totalCount: courses.length,
    })

    return (
        <Card className="overflow-hidden rounded-3xl bg-card border-2  py-0 shadow-none">
            <Table>
                <TableHeader>
                    <TableRow className="border-emerald-800/50 bg-emerald-900/40 hover:bg-emerald-900/40">
                        <TableHead className="text-zinc-300 font-medium">Course ID</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Name</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Location</TableHead>
                        <TableHead className="text-zinc-300 font-medium">Rank</TableHead>
                        <TableHead className="text-zinc-300 font-medium">PinLinks 5</TableHead>
                        <TableHead className="text-zinc-300 font-medium text-center">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.map((course, index) => (
                        <TableRow
                            key={course.id}
                            className={cn(
                                "border-emerald-800/30",
                                index % 2 === 0 ? "bg-emerald-950/20" : "bg-emerald-900/10",
                                "hover:bg-emerald-900/30"
                            )}
                        >
                            <TableCell className="font-mono text-sm text-zinc-200">
                                {course.id}
                            </TableCell>
                            <TableCell className="font-semibold text-white">
                                {course.name}
                            </TableCell>
                            <TableCell className="text-zinc-300">{course.location}</TableCell>
                            <TableCell>
                                <RankCell
                                    overallFavorite={course.overallFavorite}
                                    courseScenary={course.courseScenary}
                                />
                            </TableCell>
                            <TableCell>
                                {course.pinLinks5 ? (
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/80 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-500"
                                    >
                                        <Star className="size-3.5 fill-amber-400 text-amber-400" strokeWidth={0} />
                                        PinLinks 5
                                    </button>
                                ) : (
                                    <span className="text-zinc-500">—</span>
                                )}
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-emerald-800/40"
                                        aria-label="Edit course"
                                        onClick={() => onEditCourse?.(course)}
                                    >
                                        <Pencil className="size-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                                        aria-label="Delete course"
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
                    itemLabel="courses"
                />
            </div>
        </Card>
    )
}
