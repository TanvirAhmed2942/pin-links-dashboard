"use client"

import React, { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { Calendar, DollarSign, Users } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type EligibilityOption = "free" | "club" | "creator"

export type RaffleFormValues = {
  title: string
  startDate: string
  endDate: string
  entryFee: string
  maxEntries: string
  eligibility: EligibilityOption
  publicationStatus: "draft" | "active"
}

export type RaffleModalInitialData = {
  id?: string
  title: string
  startDate: string
  endDate: string
  entryFee: string
  maxEntries: number
  eligibility: EligibilityOption
  publicationStatus: "draft" | "active"
}

type AddEditRaffleModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  initialData?: RaffleModalInitialData | null
  onSubmit: (data: RaffleFormValues) => void
}

const defaultValues: RaffleFormValues = {
  title: "",
  startDate: "",
  endDate: "",
  entryFee: "0.00",
  maxEntries: "100",
  eligibility: "free",
  publicationStatus: "draft",
}

const ELIGIBILITY_OPTIONS: {
  value: EligibilityOption
  label: string
  description: string
}[] = [
    { value: "free", label: "Free Members Only", description: "Only for free-subscribers" },
    { value: "club", label: "Club Members Only", description: "Exclusive to paid subscribers" },
    { value: "creator", label: "Creator / Business", description: "Exclusive to paid subscribers" },
  ]

export default function AddEditRaffleModal({
  open,
  onOpenChange,
  mode,
  initialData,
  onSubmit,
}: AddEditRaffleModalProps) {
  const isEdit = mode === "edit"

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RaffleFormValues>({ defaultValues })

  useEffect(() => {
    if (open) {
      if (isEdit && initialData) {
        reset({
          title: initialData.title,
          startDate: initialData.startDate,
          endDate: initialData.endDate,
          entryFee: initialData.entryFee,
          maxEntries: String(initialData.maxEntries),
          eligibility: initialData.eligibility,
          publicationStatus: initialData.publicationStatus,
        })
      } else {
        reset(defaultValues)
      }
    }
  }, [open, isEdit, initialData, reset])

  const handleFormSubmit = (data: RaffleFormValues) => {
    onSubmit(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-2xl  overflow-y-auto border-emerald-900/50 bg-emerald-950/95 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {isEdit ? "Edit Raffle" : "Create New Raffle"}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isEdit ? "Update raffle details" : "Set up a new raffle for your users"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="rounded-xl border border-emerald-800/50 bg-emerald-900/20 p-4 space-y-4">
            <h3 className="font-semibold text-white">Schedule & Entry Settings</h3>
            <p className="text-sm text-zinc-500">
              Prize: All Categories and Brands are included
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-2">
                <Label className="text-sm font-medium text-zinc-300">Raffle Title</Label>
                <Input
                  placeholder="Premium Golf Club"
                  className="border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-xs text-red-400">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">Start Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 pointer-events-none" />
                  <Input
                    type="date"
                    className="pl-9 border-emerald-800/60 bg-emerald-900/40 text-white"
                    {...register("startDate", { required: "Start date is required" })}
                  />
                </div>
                {errors.startDate && (
                  <p className="text-xs text-red-400">{errors.startDate.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">End Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 pointer-events-none" />
                  <Input
                    type="date"
                    className="pl-9 border-emerald-800/60 bg-emerald-900/40 text-white"
                    {...register("endDate", { required: "End date is required" })}
                  />
                </div>
                {errors.endDate && (
                  <p className="text-xs text-red-400">{errors.endDate.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">Entry Fee *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 pointer-events-none" />
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="pl-9 border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
                    {...register("entryFee", { required: "Entry fee is required" })}
                  />
                </div>
                <p className="text-xs text-zinc-500">Set to 0 for free entry</p>
                {errors.entryFee && (
                  <p className="text-xs text-red-400">{errors.entryFee.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">Maximum Entries *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 pointer-events-none" />
                  <Input
                    type="number"
                    min="1"
                    placeholder="100"
                    className="pl-9 border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
                    {...register("maxEntries", { required: "Maximum entries is required" })}
                  />
                </div>
                {errors.maxEntries && (
                  <p className="text-xs text-red-400">{errors.maxEntries.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-900/20 p-4 space-y-3">
              <h3 className="font-semibold text-white">Eligibility</h3>
              <Controller
                name="eligibility"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    {ELIGIBILITY_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={cn(
                          "flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                          field.value === opt.value
                            ? "border-emerald-500/50 bg-emerald-900/30"
                            : "border-emerald-800/40 hover:bg-emerald-900/10"
                        )}
                      >
                        <input
                          type="radio"
                          name="eligibility"
                          value={opt.value}
                          checked={field.value === opt.value}
                          onChange={() => field.onChange(opt.value)}
                          className="mt-0.5 size-4 accent-emerald-500"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{opt.label}</p>
                          <p className="text-xs text-zinc-500">{opt.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              />
            </div>
            <div className="rounded-xl border border-emerald-800/50 bg-emerald-900/20 p-4 space-y-3 ">
              <h3 className="font-semibold text-white">Publication Status</h3>
              <div className="flex flex-col w-full gap-20">
                <Controller
                  name="publicationStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full border-emerald-800/60 bg-emerald-900/40 text-white [&_svg]:text-zinc-400">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="border-emerald-800/60 bg-emerald-950">
                        <SelectItem value="draft" className="text-zinc-200 focus:bg-emerald-800/50 focus:text-zinc-100">
                          Save as Draft
                        </SelectItem>
                        <SelectItem value="active" className="text-zinc-200 focus:bg-emerald-800/50 focus:text-zinc-100">
                          Publish (Active)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                <div className="flex flex-col w-full gap-2 h-full justify-end ">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 text-white hover:bg-emerald-500"
                  >
                    {isEdit ? "Update Raffle" : "Create Raffle"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#1b4d3c] text-white hover:bg-[#1b4d3c]/90 hover:text-white gap-2"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button></div>

              </div>
            </div>
          </div>


        </form>
      </DialogContent>
    </Dialog>
  )
}
