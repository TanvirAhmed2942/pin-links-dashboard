"use client"

import React, { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type PermissionLevel = "Full Access" | "Limited" | "Moderate"
export type EmployeeStatus = "Active" | "Inactive"

export const ROLES = [
  "Super Admin",
  "Content Moderation",
  "Support Manager",
  "Analytics Specialist",
  "Course Manager",
] as const

// Two columns as in image: Col1 = Users, Subscriptions, Courses, Tournaments, Moderation | Col2 = Analytics, Features, Employees, Reports
export const MODULE_OPTIONS_COL1 = [
  "Users",
  "Subscriptions",
  "Courses",
  "Tournaments",
  "Moderation",
] as const
export const MODULE_OPTIONS_COL2 = [
  "Analytics",
  "Features",
  "Employees",
  "Reports",
] as const
const ALL_MODULE_OPTIONS = [
  ...MODULE_OPTIONS_COL1,
  ...MODULE_OPTIONS_COL2,
] as const

export type EmployeeFormValues = {
  name: string
  email: string
  role: string
  assignedModules: string[]
}

export type EmployeeModalInitialData = {
  id: string
  name: string
  email: string
  role: string
  permissionLevel?: PermissionLevel
  assignedModules: string[]
  status?: EmployeeStatus
}

type AddEditEmployeeModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  initialData?: EmployeeModalInitialData | null
  onSubmit: (data: EmployeeFormValues) => void
}

const defaultValues: EmployeeFormValues = {
  name: "",
  email: "",
  role: "",
  assignedModules: [],
}

export default function AddEditEmployeeModal({
  open,
  onOpenChange,
  mode,
  initialData,
  onSubmit,
}: AddEditEmployeeModalProps) {
  const isEdit = mode === "edit"

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    defaultValues,
  })

  useEffect(() => {
    if (open) {
      if (isEdit && initialData) {
        reset({
          name: initialData.name,
          email: initialData.email,
          role: initialData.role,
          assignedModules: initialData.assignedModules ?? [],
        })
      } else {
        reset(defaultValues)
      }
    }
  }, [open, isEdit, initialData, reset])

  const handleFormSubmit = (data: EmployeeFormValues) => {
    onSubmit(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-emerald-900/50 bg-emerald-950/95 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isEdit && initialData
              ? `Editing employee ${initialData.id}`
              : "Add a new employee to the platform"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-zinc-300">
              Employee Name
            </Label>
            <Input
              id="name"
              placeholder="Enter employee name"
              className="border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">Role</Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-emerald-800/60 bg-emerald-900/40 text-white [&_svg]:text-zinc-400">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="border-emerald-800/60 bg-emerald-950">
                    {ROLES.map((role) => (
                      <SelectItem
                        key={role}
                        value={role}
                        className="text-zinc-200 focus:bg-emerald-800/50 focus:text-zinc-100"
                      >
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-xs text-red-400">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-zinc-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g., alex@gmail.com"
              className="border-emerald-800/60 bg-emerald-900/40 text-white placeholder:text-zinc-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-300">
              Add Module Permission
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div className="flex flex-col gap-3">
                {MODULE_OPTIONS_COL1.map((module) => (
                  <Controller
                    key={module}
                    name="assignedModules"
                    control={control}
                    render={({ field }) => (
                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-2 text-sm",
                          field.value.includes(module)
                            ? "text-emerald-300"
                            : "text-zinc-400"
                        )}
                      >
                        <Checkbox
                          checked={field.value.includes(module)}
                          onCheckedChange={(checked) => {
                            const next = checked
                              ? [...field.value, module]
                              : field.value.filter((m) => m !== module)
                            field.onChange(next)
                          }}
                          className="border-zinc-500 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white"
                        />
                        {module}
                      </label>
                    )}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {MODULE_OPTIONS_COL2.map((module) => (
                  <Controller
                    key={module}
                    name="assignedModules"
                    control={control}
                    render={({ field }) => (
                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-2 text-sm",
                          field.value.includes(module)
                            ? "text-emerald-300"
                            : "text-zinc-400"
                        )}
                      >
                        <Checkbox
                          checked={field.value.includes(module)}
                          onCheckedChange={(checked) => {
                            const next = checked
                              ? [...field.value, module]
                              : field.value.filter((m) => m !== module)
                            field.onChange(next)
                          }}
                          className="border-zinc-500 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white"
                        />
                        {module}
                      </label>
                    )}
                  />
                ))}
              </div>
            </div>
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
              {isEdit ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
