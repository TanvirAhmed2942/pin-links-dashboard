"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const BRANDS = [
  { name: "Ping", percent: 45, fillClass: "bg-emerald-600" },
  { name: "TaylorMade", percent: 25, fillClass: "bg-teal-500" },
  { name: "Titleist", percent: 15, fillClass: "bg-blue-500" },
  { name: "Cobra Golf", percent: 10, fillClass: "bg-orange-500" },
]

export default function TopGivingBrand() {
  return (
    <Card className="rounded-xl border-2 border-emerald-900/50 bg-card shadow-none overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white text-xl font-semibold">
          Top Giving Brand
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-5">
        {BRANDS.map((brand) => (
          <div key={brand.name} className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-white">{brand.name}</span>
              <span className="text-sm text-zinc-400 tabular-nums">
                {brand.percent}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={`h-full rounded-full ${brand.fillClass}`}
                style={{ width: `${brand.percent}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
