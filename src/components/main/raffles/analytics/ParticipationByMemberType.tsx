"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const CHART_DATA = [
    { name: "Club Members", value: 64, fill: "#71717a" },
    { name: "Free Members", value: 36, fill: "#10b981" },
]

export default function ParticipationByMemberType() {
    return (
        <Card className="rounded-xl border-2 border-emerald-900/50 bg-card shadow-none overflow-hidden">
            <CardHeader>
                <CardTitle className="text-white text-xl font-semibold">
                    Participation by Member Type
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col items-start gap-4">
                        <div className="h-[200px] w-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <Pie
                                        data={CHART_DATA}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={70}
                                        paddingAngle={2}
                                        stroke="transparent"
                                    >
                                        {CHART_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                                <div className="size-3 rounded-full bg-zinc-500" />
                                <span className="text-sm text-white">
                                    Club Members{" "}
                                    <span className="font-medium">{CHART_DATA[0].value}%</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-3 rounded-full bg-emerald-500" />
                                <span className="text-sm text-emerald-500">
                                    Free Members{" "}
                                    <span className="font-medium">{CHART_DATA[1].value}%</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 min-w-[200px]">
                        <div className="rounded-lg border-2 border-emerald-800/60 bg-emerald-900/40 p-4">
                            <p className="text-sm text-zinc-300">Club Member Revenue</p>
                            <p className="text-2xl font-bold text-white">$18,600</p>
                        </div>
                        <div className="rounded-lg border-2 border-emerald-800/60 bg-emerald-900/40 p-4">
                            <p className="text-sm text-zinc-300">Free Member Revenue</p>
                            <p className="text-2xl font-bold text-white">$6,200</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
