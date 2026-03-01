"use client"

import React, { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type PlanFeature = {
  id: string
  name: string
  value?: number | null
  enabled: boolean
}

const DURATION_OPTIONS = ["Lifetime", "Monthly", "Yearly"] as const

// Predefined features: some have numeric value, some are boolean only
const INITIAL_FEATURES: PlanFeature[] = [
  { id: "1", name: "Rank & wishlist Limited Courses", value: 10, enabled: true },
  { id: "2", name: "Limited feed posts", value: 10, enabled: true },
  { id: "3", name: "Limited photo uploads per post", value: 5, enabled: true },
  { id: "4", name: "Limited friends", value: 30, enabled: true },
  { id: "5", name: "Video posting locked", value: null, enabled: true },
  { id: "6", name: "Ads included", value: null, enabled: true },
  { id: "7", name: "No sign-up bonus points", value: null, enabled: true },
  { id: "8", name: "No points for PinLinks 5 courses", value: null, enabled: true },
  { id: "9", name: "Invite up to 5 friend", value: null, enabled: true },
]

export type AddPlanFormData = {
  planName: string
  price: string
  duration: string
  features: PlanFeature[]
}

type AddPlanSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: AddPlanFormData) => void
}

let featureIdCounter = 10

export default function AddPlanSheet({
  open,
  onOpenChange,
  onSubmit,
}: AddPlanSheetProps) {
  const [planName, setPlanName] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("Lifetime")
  const [features, setFeatures] = useState<PlanFeature[]>(() =>
    INITIAL_FEATURES.map((f) => ({ ...f }))
  )
  const [newFeatureName, setNewFeatureName] = useState("")
  const [newFeatureValue, setNewFeatureValue] = useState("")

  const resetForm = () => {
    setPlanName("")
    setPrice("")
    setDuration("Lifetime")
    setFeatures(INITIAL_FEATURES.map((f) => ({ ...f })))
    setNewFeatureName("")
    setNewFeatureValue("")
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm()
    onOpenChange(next)
  }

  const addNewFeature = () => {
    const name = newFeatureName.trim()
    if (!name) return
    const valueStr = newFeatureValue.trim()
    const value = valueStr ? parseInt(valueStr, 10) : null
    if (valueStr && isNaN(value as number)) return
    setFeatures((prev) => [
      ...prev,
      {
        id: String(++featureIdCounter),
        name,
        value: value ?? null,
        enabled: true,
      },
    ])
    setNewFeatureName("")
    setNewFeatureValue("")
  }

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    )
  }

  const updateFeatureValue = (id: string, value: number | null) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value } : f))
    )
  }

  const handleSubmit = () => {
    const data: AddPlanFormData = {
      planName,
      price,
      duration,
      features,
    }
    onSubmit?.(data)
    handleOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-md border-l border-emerald-900/50 bg-emerald-950/95 text-zinc-100 overflow-y-auto"
      >
        <SheetHeader className="border-b border-emerald-800/40 pb-4">
          <SheetTitle className="text-xl font-bold text-white">
            Add New Subscription Plan
          </SheetTitle>
          <SheetDescription className="text-zinc-400">
            Add a new subscription plan to the platform
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Plan Name
              </Label>
              <Input
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="Enter plan name"
                className="border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-zinc-300">
                Price
              </Label>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., $2.99"
                className="border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">
              Duration
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="w-full border-emerald-800/60 bg-emerald-900/40 text-white [&_svg]:text-zinc-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-emerald-800/60 bg-emerald-950">
                {DURATION_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt}
                    value={opt}
                    className="text-zinc-200 focus:bg-emerald-800/50 focus:text-zinc-100"
                  >
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-300">Add features</p>
            <div className="space-y-2">
              <Input
                value={newFeatureName}
                onChange={(e) => setNewFeatureName(e.target.value)}
                placeholder="Enter Feature name"
                className="border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
              />
              <div className="flex gap-2">
                <Input
                  value={newFeatureValue}
                  onChange={(e) => setNewFeatureValue(e.target.value)}
                  placeholder="e.g., 20"
                  type="number"
                  min={0}
                  className="border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 border-emerald-700 text-white hover:bg-emerald-800/50"
                  onClick={addNewFeature}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-300">
              Plan features
            </p>
            <ul className="flex flex-col gap-3 max-h-[280px] overflow-y-auto pr-1">
              {features.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center gap-2 rounded-lg border border-emerald-800/40 bg-emerald-900/20 p-2"
                >
                  <span className="text-sm text-zinc-200 min-w-0 flex-1">
                    {f.name}
                  </span>
                  {f.value != null ? (
                    <Input
                      type="number"
                      min={0}
                      value={f.value}
                      onChange={(e) => {
                        const v = e.target.value
                        updateFeatureValue(
                          f.id,
                          v === "" ? null : parseInt(v, 10) || 0
                        )
                      }}
                      className="h-8 w-14 border-emerald-800/60 bg-emerald-900/40 text-white text-sm shrink-0"
                    />
                  ) : null}
                  <Checkbox
                    checked={f.enabled}
                    onCheckedChange={() => toggleFeature(f.id)}
                    className="border-emerald-600 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white shrink-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <SheetFooter className="border-t border-emerald-800/40 pt-4">
          <Button
            className="w-full sm:w-auto bg-emerald-600 text-white hover:bg-emerald-500"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
