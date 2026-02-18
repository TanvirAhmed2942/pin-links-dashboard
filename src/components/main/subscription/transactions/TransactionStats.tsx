"use client"

import { Card, CardContent } from "@/components/ui/card"

const stats = [
    { label: "Total Transactions", value: "6" },
    { label: "Completed Transactions", value: "4" },
    { label: "Avg Revenue Per User", value: "$34.41" },
]

export default function TransactionStats() {
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
