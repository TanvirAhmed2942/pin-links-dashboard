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
    { month: "Jan", revenue: 13500 },
    { month: "Feb", revenue: 17000 },
    { month: "Mar", revenue: 25000 },
    { month: "Apr", revenue: 32000 },
    { month: "May", revenue: 42000 },
    { month: "Jun", revenue: 55000 },
]

const LINE_COLOR = "hsl(170 80% 50%)" // vibrant teal

export default function RevenueAnalysis() {
    return (
        <Card className="rounded-2xl  bg-card border-2 px-5 py-4 shadow-none">
            <CardHeader>
                <CardTitle className="text-white font-bold">
                    Revenue Analytics
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.1)"
                                vertical
                            />
                            <XAxis
                                dataKey="month"
                                tickLine
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.9)" }}
                            />
                            <YAxis
                                domain={[0, 60000]}
                                ticks={[0, 15000, 30000, 45000, 60000]}
                                tickLine
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.9)" }}
                                tickFormatter={(value) => value.toLocaleString()}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "var(--radius)",
                                    border: "1px solid hsl(var(--border))",
                                }}
                                formatter={(value) =>
                                    [
                                        value != null ? `$${Number(value).toLocaleString()}` : "—",
                                        "revenue",
                                    ]
                                }
                                labelFormatter={(label) => `Month: ${label}`}
                            />
                            <Legend
                                align="center"
                                verticalAlign="bottom"
                                iconType="circle"
                                iconSize={8}
                                formatter={() => (
                                    <span className="text-teal-400">revenue</span>
                                )}
                                wrapperStyle={{ paddingTop: 16 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke={LINE_COLOR}
                                strokeWidth={2}
                                dot={{ fill: LINE_COLOR, r: 4, strokeWidth: 0 }}
                                activeDot={{
                                    r: 5,
                                    fill: LINE_COLOR,
                                    stroke: "white",
                                    strokeWidth: 2,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
