"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    { name: "Active", value: 80, color: "#B5EAD7" },
    { name: "Inactive", value: 20, color: "#6A778B" },
]

const LABEL_COLORS = {
    Active: { name: "#6BD99E", value: "white" },
    Inactive: { name: "white", value: "white" },
}

function renderLabel(props: {
    cx?: number
    cy?: number
    midAngle?: number
    outerRadius?: number
    name?: string
    percent?: number
}) {
    const { cx = 0, cy = 0, midAngle = 0, outerRadius = 0, name = "", percent = 0 } = props
    const RADIAN = Math.PI / 180
    const radius = outerRadius + 24
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    const isLeft = x < cx
    const colors = name ? (LABEL_COLORS[name as keyof typeof LABEL_COLORS] ?? { name: "white", value: "white" }) : { name: "white", value: "white" }

    return (
        <text
            x={x}
            y={y}
            textAnchor={isLeft ? "end" : "start"}
            dominantBaseline="central"
            fill="white"
            className="text-sm font-medium"
        >
            <tspan fill={colors.name}>{name}: </tspan>
            <tspan fill={colors.value}>{`${Math.round(percent * 100)}%`}</tspan>
        </text>
    )
}

export default function ActiveVsInactiveUsers() {
    return (
        <Card className="bg-card border-2 rounded-3xl shadow-none">
            <CardHeader>
                <CardTitle className="text-white">Active vs Inactive Users</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="55%"
                                innerRadius={0}
                                outerRadius="75%"
                                paddingAngle={0}
                                label={renderLabel}
                                labelLine={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
