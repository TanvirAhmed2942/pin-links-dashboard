"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type DetailCardProps = {
  title: string
  icon?: React.ReactNode
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export default function DetailCard({
  title,
  icon,
  subtitle,
  children,
  className,
}: DetailCardProps) {
  return (
    <Card
      className={cn(
        "rounded-2xl border bg-card text-zinc-200 overflow-hidden h-full",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2 pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-white">
          {icon && <span className="text-zinc-400">{icon}</span>}
          {title}
        </CardTitle>
        {subtitle && (
          <span className="text-sm text-zinc-400">{subtitle}</span>
        )}
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  )
}
