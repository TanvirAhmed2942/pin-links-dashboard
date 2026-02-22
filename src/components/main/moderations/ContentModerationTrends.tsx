"use client"

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    { date: "Jun 10", posted: 44, reported: 4, removed: 2 },
    { date: "Jun 11", posted: 52, reported: 5, removed: 3 },
    { date: "Jun 12", posted: 48, reported: 3, removed: 1 },
    { date: "Jun 13", posted: 62, reported: 4, removed: 1 },
    { date: "Jun 14", posted: 56, reported: 2, removed: 1 },
    { date: "Jun 15", posted: 58, reported: 2, removed: 1 },
]

const COLORS = {
    posted: "hsl(160 84% 50%)",      // bright green/teal
    reported: "hsl(15 90% 60%)",     // reddish-orange
    removed: "hsl(0 0% 65%)",        // light gray
}

const TICK_FILL = "rgba(255,255,255,0.7)"
const GRID_STROKE = "rgba(255,255,255,0.12)"

export default function ContentModerationTrends() {
    return (
        <Card className="overflow-hidden rounded-2xl border-2 bg-card shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium text-white">
                    Content Moderation Trends
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
                        >
                            <CartesianGrid
                                strokeDasharray="0"
                                stroke={GRID_STROKE}
                                horizontal
                                vertical={false}
                            />
                            <XAxis
                                dataKey="date"
                                tickLine={{ stroke: GRID_STROKE }}
                                axisLine={{ stroke: GRID_STROKE }}
                                tick={{ fontSize: 12, fill: TICK_FILL }}
                            />
                            <YAxis
                                domain={[0, 80]}
                                ticks={[0, 20, 40, 60, 80]}
                                tickLine={{ stroke: GRID_STROKE }}
                                axisLine={{ stroke: GRID_STROKE }}
                                tick={{ fontSize: 12, fill: TICK_FILL }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: 8,
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    backgroundColor: "#10211a",
                                }}
                                labelStyle={{ color: "rgba(255,255,255,0.9)" }}
                                itemStyle={{ color: "rgba(255,255,255,0.8)" }}
                            />
                            <Legend
                                align="center"
                                verticalAlign="bottom"
                                iconType="diamond"
                                iconSize={8}
                                wrapperStyle={{ paddingTop: 12 }}
                                formatter={(value) => (
                                    <span className="text-sm text-white/90">{value}</span>
                                )}
                            />
                            <Line
                                type="monotone"
                                name="Posted"
                                dataKey="posted"
                                stroke={COLORS.posted}
                                strokeWidth={2}
                                dot={{ fill: COLORS.posted, r: 4, strokeWidth: 0 }}
                                activeDot={{ r: 5, fill: COLORS.posted, stroke: "white", strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                name="Reported"
                                dataKey="reported"
                                stroke={COLORS.reported}
                                strokeWidth={2}
                                dot={{ fill: COLORS.reported, r: 4, strokeWidth: 0 }}
                                activeDot={{ r: 5, fill: COLORS.reported, stroke: "white", strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                name="removed"
                                dataKey="removed"
                                stroke={COLORS.removed}
                                strokeWidth={2}
                                dot={{ fill: COLORS.removed, r: 4, strokeWidth: 0 }}
                                activeDot={{ r: 5, fill: COLORS.removed, stroke: "white", strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
