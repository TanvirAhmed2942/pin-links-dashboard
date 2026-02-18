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

const SCALE = 1.12

function BarShape(props: {
    x?: number
    y?: number
    width?: number
    height?: number
    fill?: string
    stroke?: string
    strokeWidth?: number
}) {
    const { x = 0, y = 0, width = 0, height = 0, fill, stroke, strokeWidth } = props
    const scaledHeight = height * SCALE
    const scaledY = y - (scaledHeight - height) / 2
    return (
        <rect
            x={x}
            y={scaledY}
            width={width}
            height={scaledHeight}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
        />
    )
}

const data = [
    { name: "Pebble Beach", rating: 1.95 },
    { name: "Pine Valley", rating: 4.95 },
    { name: "Augusta National", rating: 2.95 },
    { name: "St Andrews", rating: 4.95 },
    { name: "Cypress Point", rating: 3.95 },
]

const BAR_FILL = "hsl(142 45% 22%)" // dark green #1E5128 style
const BAR_STROKE = "hsl(142 45% 14%)" // darker green for border

export default function TopRatedCourses() {
    return (
        <Card className="rounded-2xl bg-card border-2 p-4 shadow-none">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">
                    Top Rated Courses
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={data}
                            margin={{ top: 8, right: 8, left: 16, bottom: 8 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.08)"
                                horizontal={false}
                            />
                            <XAxis
                                type="number"
                                domain={[0, 5]}
                                ticks={[0, 2, 5]}
                                tickLine
                                axisLine
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.9)" }}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={100}
                                tickLine
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.9)" }}
                            />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: "var(--radius)",
                                    border: "1px solid hsl(var(--border))",
                                }}
                                formatter={(value) => [
                                    value != null ? Number(value).toFixed(1) : "—",
                                    "Rating",
                                ]}
                                labelFormatter={(label) => `Course: ${label}`}
                                cursor={false}
                            />
                            <Bar
                                dataKey="rating"
                                fill={BAR_FILL}
                                stroke={BAR_STROKE}
                                strokeWidth={1}
                                radius={0}
                                barSize={40}
                                isAnimationActive={false}
                                shape={(props) => (
                                    <rect
                                        x={props.x}
                                        y={props.y}
                                        width={props.width}
                                        height={props.height}
                                        fill={BAR_FILL}
                                        stroke={BAR_STROKE}
                                        strokeWidth={1}
                                    />
                                )}
                                activeBar={(props) => (
                                    <BarShape
                                        x={props.x}
                                        y={props.y}
                                        width={props.width}
                                        height={props.height}
                                        fill={"#00aa74"}
                                        stroke={BAR_STROKE}
                                        strokeWidth={1}
                                    />
                                )}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
