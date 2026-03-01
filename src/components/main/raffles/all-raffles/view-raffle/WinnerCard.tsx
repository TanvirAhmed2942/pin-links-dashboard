"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

export type WinnerData = {
  name: string
  email: string
  drawnDate: string
}

export default function WinnerCard({ data }: { data: WinnerData }) {
  return (
    <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white">Winner</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-700/50 text-emerald-400">
            <User className="size-5" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-white">{data.name}</p>
            <p className="text-sm text-zinc-500">{data.email}</p>
            <p className="mt-1 text-xs text-zinc-500 text-right">
              Drawn: {data.drawnDate}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
