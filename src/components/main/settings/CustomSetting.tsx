"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings } from "lucide-react"

const GAME_MECHANICS_FEATURES = [
    {
        id: "handicap",
        title: "Automatic Handicap Calculation",
        description: "Automatically calculate and update user handicaps",
    },
    {
        id: "reminder",
        title: "Tournament Reminder Notifications",
        description: "Send reminders 24 hours before tournament start",
    },
]

export default function CustomSetting() {
    const [enabled, setEnabled] = useState<Record<string, boolean>>({
        handicap: false,
        reminder: false,
    })

    return (
        <div className="space-y-6">
            <div className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 p-6">
                <h2 className="text-xl font-bold text-white">
                    Custom Rules & Settings
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                    Configure settings for user privacy, leaderboards, and game mechanics.
                </p>
            </div>

            <h3 className="text-lg font-semibold text-white">Game Mechanics</h3>

            <div className="space-y-4">
                {GAME_MECHANICS_FEATURES.map((feature) => (
                    <Card
                        key={feature.id}
                        className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden"
                    >
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0 flex-1 space-y-1">
                                    <h4 className="font-semibold text-white">{feature.title}</h4>
                                    <p className="text-sm text-zinc-400">{feature.description}</p>
                                    <div className="flex items-center gap-2 pt-2">
                                        <Switch
                                            id={feature.id}
                                            checked={enabled[feature.id] ?? false}
                                            onCheckedChange={(checked) =>
                                                setEnabled((prev) => ({
                                                    ...prev,
                                                    [feature.id]: checked === true,
                                                }))
                                            }
                                            className="data-[state=unchecked]:bg-gray-50 data-[state=checked]:bg-[#00aa74]"
                                        />
                                        <Label
                                            htmlFor={feature.id}
                                            className="cursor-pointer text-sm text-zinc-400"
                                        >
                                            {enabled[feature.id] ?? false ? "Enabled" : "Disabled"}
                                        </Label>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-900/50 text-emerald-400 hover:bg-emerald-800/50 hover:text-emerald-300 transition-colors"
                                    aria-label="Settings"
                                >
                                    <Settings className="size-5" />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
