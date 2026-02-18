"use client"

import { TrendingUp } from "lucide-react"
import DetailCard from "./DetailCard"
import { cn } from "@/lib/utils"

type SubscriptionCardProps = {
  plan: "Pro" | "Free"
  memberSince: string
  lastActive: string
}

export default function SubscriptionCard({
  plan,
  memberSince,
  lastActive,
}: SubscriptionCardProps) {
  return (
    <DetailCard title="Subscription" icon={<TrendingUp className="size-5 text-sidebar-foreground" />}>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">Current Plan</span>
          <span
            className={cn(
              "rounded-md px-2.5 py-0.5 text-xs font-medium",
              plan === "Pro" && "bg-emerald-500/80 text-white",
              plan === "Free" && "bg-zinc-500/40 text-zinc-200"
            )}
          >
            {plan}
          </span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>Member Since</span>
          <span className="text-zinc-200">{memberSince}</span>
        </div>
        <div className="flex justify-between text-zinc-400">
          <span>Last Active</span>
          <span className="text-zinc-200">{lastActive}</span>
        </div>
      </div>
    </DetailCard>
  )
}
