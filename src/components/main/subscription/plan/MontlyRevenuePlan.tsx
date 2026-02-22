"use client"

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    { plan: "Free", revenue: 0 },
    { plan: "PinLinks Club Member", revenue: 12000 },
    { plan: "Creator / Business", revenue: 92000 },
]

const BAR_COLOR = "hsl(160 55% 28%)" // dark green #2B6D4C style

export default function MontlyRevenuePlan() {
    return (
        <Card className="rounded-2xl  h-full  bg-card border-2 px-5 py-4 shadow-none">
            <CardHeader>
                <CardTitle className="text-white font-bold">
                    Monthly Revenue by Plan
                </CardTitle>
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
                                stroke="rgba(255,255,255,0.08)"
                                vertical
                            />
                            <XAxis
                                dataKey="plan"
                                tickLine
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.9)" }}
                            />
                            <YAxis
                                domain={[0, 100000]}
                                ticks={[0, 25000, 50000, 75000, 100000]}
                                tickLine
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.9)" }}
                                tickFormatter={(value) => value.toLocaleString()}
                            />
                            <Tooltip
                                cursor={false}
                                contentStyle={{
                                    borderRadius: "var(--radius)",
                                    border: "1px solid hsl(var(--border))",
                                }}
                                formatter={(value) => [
                                    value != null ? `$${Number(value).toLocaleString()}` : "—",
                                    "Revenue",
                                ]}
                                labelFormatter={(label) => `Plan: ${label}`}
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
