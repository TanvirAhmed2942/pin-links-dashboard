"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import PageLimit from "@/components/common/pagelimit/PageLimit"
import type { PaginationData } from "@/components/common/pagelimit/PageLimit"
import { Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

type PermissionLevel = "Full Access" | "Limited" | "Moderate"
type EmployeeStatus = "Active" | "Inactive"

export type Employee = {
  id: string
  name: string
  email: string
  role: string
  permissionLevel: PermissionLevel
  assignedModules: string[]
  status: EmployeeStatus
}

const employees: Employee[] = [
  {
    id: "EMP-001",
    name: "Alice Johnson",
    email: "alice.johnson@pinlinks.com",
    role: "Super Admin",
    permissionLevel: "Full Access",
    assignedModules: ["All Modules"],
    status: "Active",
  },
  {
    id: "EMP-001",
    name: "Alice Johnson",
    email: "alice.johnson@pinlinks.com",
    role: "Content Moderation",
    permissionLevel: "Limited",
    assignedModules: ["Moderation", "Reports"],
    status: "Active",
  },
  {
    id: "EMP-001",
    name: "Alice Johnson",
    email: "alice.johnson@pinlinks.com",
    role: "Support Manager",
    permissionLevel: "Limited",
    assignedModules: ["Users", "Reports"],
    status: "Active",
  },
  {
    id: "EMP-001",
    name: "Alice Johnson",
    email: "alice.johnson@pinlinks.com",
    role: "Analytics Specialist",
    permissionLevel: "Limited",
    assignedModules: ["Analytics", "Reports"],
    status: "Active",
  },
  {
    id: "EMP-001",
    name: "Alice Johnson",
    email: "alice.johnson@pinlinks.com",
    role: "Course Manager",
    permissionLevel: "Moderate",
    assignedModules: ["Courses", "Tournaments", "Subscriptions"],
    status: "Active",
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function PermissionBadge({ level }: { level: PermissionLevel }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white",
        level === "Full Access" && "bg-emerald-500",
        level === "Limited" && "bg-amber-500",
        level === "Moderate" && "bg-blue-500"
      )}
    >
      {level}
    </span>
  )
}

function ModuleBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full bg-zinc-600/80 px-2.5 py-0.5 text-xs font-medium text-white">
      {label}
    </span>
  )
}

function StatusBadge({ status }: { status: EmployeeStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white",
        status === "Active" && "bg-emerald-500",
        status === "Inactive" && "bg-zinc-500"
      )}
    >
      {status}
    </span>
  )
}

type EmployeeTableProps = {
  onEditEmployee?: (employee: Employee) => void
}

export default function EmployeeTable({ onEditEmployee }: EmployeeTableProps) {
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    pageSize: 10,
    totalCount: employees.length,
  })

  return (
    <Card className="overflow-hidden rounded-3xl border-2 border-emerald-900/50 bg-card py-0 shadow-none">
      <Table>
        <TableHeader>
          <TableRow className="border-emerald-800/50 bg-emerald-900/40 hover:bg-emerald-900/40">
            <TableHead className="text-zinc-300 font-medium">
              Employee ID
            </TableHead>
            <TableHead className="text-zinc-300 font-medium">Name</TableHead>
            <TableHead className="text-zinc-300 font-medium">Email</TableHead>
            <TableHead className="text-zinc-300 font-medium">Role</TableHead>
            <TableHead className="text-zinc-300 font-medium">
              Permission Level
            </TableHead>
            <TableHead className="text-zinc-300 font-medium">
              Assigned Modules
            </TableHead>
            <TableHead className="text-zinc-300 font-medium">Status</TableHead>
            <TableHead className="text-zinc-300 font-medium text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow
              key={`${employee.id}-${employee.role}-${index}`}
              className={cn(
                "border-emerald-800/30",
                index % 2 === 0 ? "bg-emerald-950/20" : "bg-emerald-900/10",
                "hover:bg-emerald-900/30"
              )}
            >
              <TableCell className="font-mono text-sm text-zinc-200">
                {employee.id}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-8 rounded-full border border-emerald-800/50 bg-emerald-900/60">
                    <AvatarFallback className="rounded-full bg-emerald-800/60 text-sm font-medium text-white">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-white">{employee.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-zinc-300">{employee.email}</TableCell>
              <TableCell className="text-white">{employee.role}</TableCell>
              <TableCell>
                <PermissionBadge level={employee.permissionLevel} />
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {employee.assignedModules.map((mod) => (
                    <ModuleBadge key={mod} label={mod} />
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={employee.status} />
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-emerald-800/40"
                  aria-label="Edit employee"
                  onClick={() => onEditEmployee?.(employee)}
                >
                  <Pencil className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-emerald-800/50 bg-emerald-900/20 px-4 py-3">
        <PageLimit
          pagination={pagination}
          onPaginationChange={setPagination}
          itemLabel="employees"
        />
      </div>
    </Card>
  )
}
