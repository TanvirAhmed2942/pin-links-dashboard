"use client"

import { Card, CardContent } from "@/components/ui/card"

const stats = [
    { label: "Total Courses", value: "6" },
    { label: "PinLinks Rated Courses", value: "4" },
    { label: "Total Rating ", value: "53,410" },
]

export default function CourseStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-1/2">
            {stats.map((item) => (
                <Card
                    key={item.label}
                    className="rounded-2xl  h-full  bg-card border-2 px-5 py-4 shadow-none"
                >
                    <CardContent className="p-0">
                        <p className="text-sm font-medium text-emerald-200/80">
                            {item.label}
                        </p>
                        <p className="mt-1 text-2xl font-bold tracking-tight text-white">
                            {item.value}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
