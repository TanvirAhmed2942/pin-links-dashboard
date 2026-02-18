"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type UserDetailsProfileProps = {
  name: string
  userId: string
  status: "active" | "inactive" | "Suspended"
  initials?: string
}

export default function UserDetailsProfile({
  name,
  userId,
  status,
  initials,
}: UserDetailsProfileProps) {
  const initial = initials ?? name.split(" ").map((n) => n[0]).join("").slice(0, 2)

  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-16 shrink-0 rounded-full bg-emerald-800 text-white border-0">
        <AvatarFallback className="bg-emerald-800 text-lg font-semibold text-white">
          {initial}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">{name}</h1>
        <p className="text-sm text-zinc-400">User ID: {userId}</p>
        <span
          className={cn(
            "inline-flex rounded-md px-2.5 py-0.5 text-xs font-medium capitalize",
            status === "active" &&
              "bg-emerald-500/80 text-white",
            status === "inactive" &&
              "bg-violet-500/30 text-violet-200",
            status === "Suspended" &&
              "bg-red-500/80 text-white"
          )}
        >
          {status}
        </span>
      </div>
    </div>
  )
}
