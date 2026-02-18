"use client"

import { Card, CardContent } from "@/components/ui/card"

const stats = [
    { label: "Total Active Plans", value: "3" },
    { label: "Total Subscribers", value: "5,300" },
    { label: "Monthly Revenue", value: "$104,360" },
]

export default function PlanStats() {
    return (
        <div className="flex flex-col gap-4 h-full">
            {stats.map((item) => (
                <Card
                    key={item.label}
                    className="rounded-2xl  h-full  bg-card border-2 px-5 py-4 shadow-none"
                >
                    <CardContent className="p-0">
                        <p className="text-sm font-medium text-zinc-400">{item.label}</p>
                        <p className="mt-1 text-2xl font-bold tracking-tight text-white">
                            {item.value}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
