"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ImagePlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type CategoryFormValues = {
  name: string
  description: string
  image?: FileList | null
}

export type CategoryModalInitialData = {
  id: number | string
  name: string
  description?: string
  image: string
}

type CategoryAddEditModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  initialData?: CategoryModalInitialData | null
  onSubmit: (data: CategoryFormValues) => void
}

const defaultValues: CategoryFormValues = {
  name: "",
  description: "",
  image: null,
}

export default function CategoryAddEditModal({
  open,
  onOpenChange,
  mode,
  initialData,
  onSubmit,
}: CategoryAddEditModalProps) {
  const isEdit = mode === "edit"

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({ defaultValues })

  const imageFiles = watch("image")
  const hasNewFile = imageFiles?.length && imageFiles.length > 0
  const [objectUrl, setObjectUrl] = useState<string | null>(null)
  const existingImageUrl = isEdit ? initialData?.image : null

  useEffect(() => {
    if (hasNewFile && imageFiles?.[0]) {
      const url = URL.createObjectURL(imageFiles[0])
      setObjectUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setObjectUrl(null)
  }, [hasNewFile, imageFiles])

  const previewUrl = objectUrl ?? existingImageUrl ?? null

  useEffect(() => {
    if (open) {
      if (isEdit && initialData) {
        reset({
          name: initialData.name,
          description: initialData.description ?? "",
          image: null,
        })
      } else {
        reset(defaultValues)
      }
    }
  }, [open, isEdit, initialData, reset])

  const handleFormSubmit = (data: CategoryFormValues) => {
    onSubmit(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-emerald-900/50 bg-emerald-950/95 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {isEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isEdit && initialData
              ? `Editing category "${initialData.name}"`
              : "Add a new raffle category"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-zinc-300">
              Category Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Driver"
              className="border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-zinc-300">
              Description (optional)
            </Label>
            <textarea
              id="description"
              placeholder="Brief description of the category"
              rows={3}
              className="w-full rounded-md border border-emerald-800/60 bg-emerald-900/40 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              {...register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">Image</Label>
            <label
              className={cn(
                "flex h-[140px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors overflow-hidden",
                "border-emerald-800/60 bg-emerald-900/20 hover:bg-emerald-900/40"
              )}
            >
              {previewUrl ? (
                <div className="relative h-full w-full rounded-lg overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Category"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-6 text-zinc-500">
                  <ImagePlus className="size-10" />
                  <span className="text-sm">Click or drag to upload image</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                {...register("image")}
              />
            </label>
          </div>

          <DialogFooter className="gap-2 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-zinc-600 text-zinc-200 hover:bg-zinc-800"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 text-white hover:bg-emerald-500"
            >
              {isEdit ? "Update Category" : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
