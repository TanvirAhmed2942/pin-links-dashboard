"use client"

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    { day: "Mon", posts: 148, tournaments: 12 },
    { day: "Tue", posts: 162, tournaments: 17 },
    { day: "Wed", posts: 180, tournaments: 17 },
    { day: "Thu", posts: 157, tournaments: 12 },
    { day: "Fri", posts: 187, tournaments: 22 },
    { day: "Sat", posts: 237, tournaments: 32 },
    { day: "Sun", posts: 197, tournaments: 17 },
]

const POSTS_COLOR = "hsl(160 55% 32%)" // darker green
const TOURNAMENTS_COLOR = "#B5EAD7" // lighter green/yellowish

export default function WeeklyEngagement() {
    return (
        <Card className="bg-card border-2 rounded-3xl shadow-none">
            <CardHeader>
                <CardTitle className="text-white">Weekly Engagement</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.1)"
                                vertical
                            />
                            <XAxis
                                dataKey="day"
                                tickLine
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }}
                            />
                            <YAxis
                                domain={[0, 240]}
                                ticks={[0, 60, 120, 180, 240]}
                                tickLine
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }}
                                tickFormatter={(value) => value.toString()}
                            />
                            <Tooltip
                                cursor={false}
                                contentStyle={{
                                    borderRadius: "var(--radius)",
                                    border: "1px solid hsl(var(--border))",
                                }}
                                formatter={(value, name) => [value != null ? value : "—", name]}
                                labelFormatter={(label) => `Day: ${label}`}
                            />
                            <Legend
                                align="center"
                                verticalAlign="bottom"
                                iconType="square"
                                iconSize={10}
                                formatter={(value) => (
                                    <span className="text-emerald-400/90">{value}</span>
                                )}
                                wrapperStyle={{ paddingTop: 16 }}
                            />
                            <Bar
                                dataKey="posts"
                                name="posts"
                                fill={POSTS_COLOR}
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="tournaments"
                                name="tournaments"
                                fill={TOURNAMENTS_COLOR}
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
