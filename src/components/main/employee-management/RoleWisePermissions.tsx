"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const ROLES = [
    "Super Admin",
    "Content Moderator",
    "Support Manager",
    "Analytics Specialist",
    "Course Manager",
] as const

const MODULES = [
    "Users",
    "Subscriptions",
    "Courses",
    "Tournaments",
    "Moderation",
    "Analytics",
    "Features",
    "Employees",
    "Reports",
] as const

type Role = (typeof ROLES)[number]
type Module = (typeof MODULES)[number]

// Per-role permissions: role -> set of enabled module keys
function initialPermissions(): Record<Role, Set<Module>> {
    const record = {} as Record<Role, Set<Module>>
    ROLES.forEach((role) => {
        record[role] = new Set()
    })
    // Super Admin: Moderation + Reports checked as in image
    record["Super Admin"].add("Moderation")
    record["Super Admin"].add("Reports")
    return record
}

export default function RoleWisePermissions() {
    const [selectedRole, setSelectedRole] = useState<Role>("Super Admin")
    const [permissions, setPermissions] = useState<Record<Role, Set<Module>>>(
        initialPermissions
    )
    const [lastAction, setLastAction] = useState<"grant" | "revoke" | null>(null)

    const currentSet = permissions[selectedRole]

    const toggleModule = (module: Module) => {
        setPermissions((prev) => {
            const next = { ...prev }
            const set = new Set(next[selectedRole])
            if (set.has(module)) set.delete(module)
            else set.add(module)
            next[selectedRole] = set
            return next
        })
        setLastAction(null)
    }

    const grantAll = () => {
        setPermissions((prev) => {
            const next = { ...prev }
            next[selectedRole] = new Set(MODULES)
            return next
        })
        setLastAction("grant")
    }

    const revokeAll = () => {
        setPermissions((prev) => {
            const next = { ...prev }
            next[selectedRole] = new Set()
            return next
        })
        setLastAction("revoke")
    }

    const saveChanges = () => {
        // TODO: persist to API
        setLastAction(null)
    }

    return (
        <div className="space-y-4">
            <Link
                href="/dashboard/employee"
                className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
            >
                <ChevronLeft className="size-4" />
                Back to Users
            </Link>

            <div className="flex flex-wrap items-center justify-between gap-4">
                <SmallPageInfo
                    title="Role & Permission Editor"
                    description="Configure module access permissions for different roles"
                />
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        className={cn(
                            "text-white border-emerald-700 hover:bg-emerald-900/50 hover:text-white gap-2",
                            lastAction === "grant" &&
                            "bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500 hover:text-white"
                        )}
                        onClick={grantAll}
                    >
                        Grant All Permissions
                    </Button>
                    <Button
                        variant="outline"
                        className={cn(
                            "text-white border-emerald-700 hover:bg-emerald-900/50 hover:text-white gap-2",
                            lastAction === "revoke" &&
                            "bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500 hover:text-white"
                        )}
                        onClick={revokeAll}
                    >
                        Revoke All Permissions
                    </Button>
                    <Button
                        className="bg-emerald-600 text-white hover:bg-emerald-500 gap-2"
                        onClick={saveChanges}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 p-4">
                <p className="text-sm font-medium text-zinc-300 mb-3">Select Role</p>
                <div className="flex flex-wrap gap-2">
                    {ROLES.map((role) => (
                        <Button
                            key={role}
                            variant="outline"
                            className={cn(
                                "text-white border-emerald-800",
                                selectedRole === role
                                    ? "bg-emerald-800 border-emerald-700 text-white hover:bg-emerald-700 hover:text-white"
                                    : "bg-background border text-zinc-200 hover:bg-emerald-900/50 hover:text-white"
                            )}
                            onClick={() => setSelectedRole(role)}
                        >
                            {role}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 overflow-hidden">
                <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-emerald-800/50 bg-emerald-900/40 px-4 py-3">
                    <span className="text-sm font-medium text-zinc-300">Module</span>
                    <span className="text-sm font-medium text-zinc-300 w-[180px] text-right">
                        All Settings Permission
                    </span>
                </div>
                <div className="divide-y divide-emerald-800/30">
                    {MODULES.map((module) => (
                        <div
                            key={module}
                            className="grid grid-cols-[1fr_auto] gap-4 items-center px-4 py-3"
                        >
                            <span className="text-sm text-zinc-200">{module}</span>
                            <div className="w-[180px] flex justify-end">
                                <Checkbox
                                    checked={currentSet.has(module)}
                                    onCheckedChange={() => toggleModule(module)}
                                    className="border-emerald-600 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
