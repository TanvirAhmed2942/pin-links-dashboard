"use client"

import React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type FilterInputProps = {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

/**
 * Self-contained search input for filter bars. Reports value to parent via onChange.
 */
function FilterInput({
  placeholder = "Search...",
  value,
  onChange,
  className,
}: FilterInputProps) {
  return (
    <div className={cn("relative flex-1 min-w-[200px]", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
      <Input
        className={cn(
          "h-10 w-full rounded-lg border-emerald-800/60 bg-background pl-10 pr-4 text-white placeholder:text-zinc-500",
          "focus-visible:border-emerald-600 focus-visible:ring-emerald-500/20 focus-visible:ring-2"
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default FilterInput
