"use client"

import Image from "next/image"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type RaffleCategoryCardProps = {
  id: number | string
  name: string
  image: string
  description?: string
  onEdit?: (id: number | string) => void
  onDelete?: (id: number | string) => void
}

export default function RaffleCategoryCard({
  id,
  name,
  image,
  onEdit,
  onDelete,
}: RaffleCategoryCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-4xl overflow-hidden",
        "bg-[#1D352C] border border-emerald-900/50 w-60"
      )}
    >
      <div className="p-4 flex flex-col items-center gap-4">
        <div className="w-full aspect-square  rounded-2xl bg-white overflow-hidden shrink-0 flex items-center justify-center">
          <Image
            src={image}
            alt={name}
            className="w-full h-full object-contain"
            width={180}
            height={180}
          />
        </div>
        <h3 className="text-xl font-bold text-white text-center">{name}</h3>
      </div>
      <div className="flex gap-2 p-4 pt-0">
        <Button
          variant="ghost"
          className="flex-1 bg-emerald-800/80 text-white hover:bg-emerald-700/80 gap-2 rounded-lg"
          onClick={() => onEdit?.(id)}
        >
          <Pencil className="size-4" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 bg-red-600 hover:bg-red-500 text-white rounded-lg"
          onClick={() => onDelete?.(id)}
          aria-label="Delete category"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  )
}
