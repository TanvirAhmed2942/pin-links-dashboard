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
    { month: "Jan", revenue: 8000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 22000 },
    { month: "Apr", revenue: 32000 },
    { month: "May", revenue: 42000 },
    { month: "Jun", revenue: 55000 },
]

const BAR_COLOR = "hsl(160 60% 35%)" // dark green

export default function RevenueGrowth() {
    return (
        <Card className="bg-card border-2 rounded-3xl shadow-none">
            <CardHeader>
                <CardTitle className="text-white">Revenue Growth</CardTitle>
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
                                dataKey="month"
                                tickLine
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }}
                            />
                            <YAxis
                                domain={[0, 60000]}
                                ticks={[0, 15000, 30000, 45000, 60000]}
                                tickLine
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }}
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
                                iconType="square"
                                iconSize={10}
                                formatter={() => (
                                    <span className="text-emerald-400">revenue</span>
                                )}
                                wrapperStyle={{ paddingTop: 16 }}
                            />
                            <Bar
                                dataKey="revenue"
                                fill={BAR_COLOR}
                                radius={[4, 4, 0, 0]}

                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
