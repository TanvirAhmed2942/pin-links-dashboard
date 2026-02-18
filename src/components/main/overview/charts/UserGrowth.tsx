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
    { month: "Jan", users: 1300 },
    { month: "Feb", users: 1850 },
    { month: "Mar", users: 2550 },
    { month: "Apr", users: 3250 },
    { month: "May", users: 4250 },
    { month: "Jun", users: 5450 },
]

const LINE_COLOR = "hsl(160 84% 45%)" // vibrant green/teal

export default function UserGrowth() {
    return (
        <Card className=" bg-card border-2 rounded-3xl shadow-none">
            <CardHeader>
                <CardTitle className="text-white">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[320px] w-full">
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
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }}
                            />
                            <YAxis
                                domain={[0, 6000]}
                                ticks={[0, 1500, 3000, 4500, 6000]}
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
                                    [value != null ? value.toLocaleString() : "—", "users"]
                                }
                                labelFormatter={(label) => `Month: ${label}`}
                            />
                            <Legend
                                align="center"
                                verticalAlign="bottom"
                                iconType="circle"
                                iconSize={8}
                                formatter={() => <span className="text-emerald-400">users</span>}
                                wrapperStyle={{ paddingTop: 16 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke={LINE_COLOR}
                                strokeWidth={2}
                                dot={{ fill: LINE_COLOR, r: 4, strokeWidth: 0 }}
                                activeDot={{ r: 5, fill: LINE_COLOR, stroke: "white", strokeWidth: 2 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
