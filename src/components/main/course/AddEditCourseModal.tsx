"use client"

import React, { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
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
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export type CourseFormValues = {
  courseName: string
  location: string
  pinLinks5: boolean
  media?: FileList | null
}

export type CourseModalInitialData = {
  id: string
  name: string
  location: string
  pinLinks5: boolean
  mediaUrl?: string | null
}

type AddEditCourseModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  initialData?: CourseModalInitialData | null
  onSubmit: (data: CourseFormValues) => void
}

const defaultValues: CourseFormValues = {
  courseName: "",
  location: "",
  pinLinks5: false,
  media: null,
}

export default function AddEditCourseModal({
  open,
  onOpenChange,
  mode,
  initialData,
  onSubmit,
}: AddEditCourseModalProps) {
  const isEdit = mode === "edit"

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormValues>({
    defaultValues,
  })

  const mediaFiles = watch("media")
  const hasNewFile = mediaFiles?.length && mediaFiles.length > 0
  const file = hasNewFile ? mediaFiles?.[0] : null
  const [objectUrl, setObjectUrl] = React.useState<string | null>(null)

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setObjectUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setObjectUrl(null)
  }, [file])

  const previewUrl = objectUrl ?? (isEdit ? initialData?.mediaUrl ?? null : null)

  useEffect(() => {
    if (open) {
      if (isEdit && initialData) {
        reset({
          courseName: initialData.name,
          location: initialData.location,
          pinLinks5: initialData.pinLinks5,
          media: null,
        })
      } else {
        reset(defaultValues)
      }
    }
  }, [open, isEdit, initialData, reset])

  const handleFormSubmit = (data: CourseFormValues) => {
    onSubmit(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-emerald-900/50 bg-emerald-950/95 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {isEdit ? "Edit Course" : "Add New Course"}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isEdit && initialData
              ? `Editing course ${initialData.id}`
              : "Add a new golf course to the platform"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="courseName" className="text-sm font-medium text-zinc-300">
                Course Name
              </label>
              <Input
                id="courseName"
                placeholder="e.g. Pebble Beach Golf Links"
                className="border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
                {...register("courseName", { required: "Course name is required" })}
              />
              {errors.courseName && (
                <p className="text-xs text-red-400">{errors.courseName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium text-zinc-300">
                Location
              </label>
              <Input
                id="location"
                placeholder="e.g. Pebble Beach, CA"
                className="border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <p className="text-xs text-red-400">{errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Media</label>
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
                    alt="Course"
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
                {...register("media")}
              />
            </label>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg border border-emerald-800/40 bg-emerald-900/20 p-4">
            <div>
              <p className="text-sm font-medium text-zinc-200">PinLinks 5 Status</p>
              <p className="text-xs text-zinc-500">
                Mark this course as a top-rated PinLinks 5 destination
              </p>
            </div>
            <Controller
              name="pinLinks5"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-zinc-600"
                />
              )}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              className="bg-[#1b4d3c] text-white hover:bg-[#1b4d3c]/90 hover:text-white gap-2"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 text-white hover:bg-emerald-500"
            >
              {isEdit ? "Update Course" : "Add Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
