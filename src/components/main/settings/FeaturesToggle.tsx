"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type TierId = "free" | "club" | "creator"

type FeatureItem = {
    id: string
    name: string
    enabled: boolean
    limit?: number
}

const TIER_LABELS: Record<TierId, string> = {
    free: "Free",
    club: "PinLinks Club Member",
    creator: "Creator / Business",
}

const TIER_FEATURES: Record<TierId, FeatureItem[]> = {
    free: [
        { id: "f1", name: "Rank unlimited courses", enabled: false },
        { id: "f2", name: "Wishlist limited courses", enabled: true, limit: 5 },
        { id: "f3", name: "Limited photo uploads per post", enabled: true, limit: 5 },
        { id: "f4", name: "10 seconds long video posting", enabled: true },
        { id: "f5", name: "Ads included", enabled: true },
        { id: "f6", name: "No sign-up bonus points", enabled: true },
        { id: "f7", name: "No points for PinLinks 5 courses", enabled: true },
        { id: "f8", name: "Invite up to 5 friend for the tournament", enabled: true },
    ],
    club: [
        { id: "c1", name: "Unlimited course rankings", enabled: true },
        { id: "c2", name: "Wishlist unlimited courses", enabled: true },
        { id: "c3", name: "Unlimited photo uploads per post", enabled: true },
        { id: "c4", name: "60 seconds long video posting", enabled: true },
        { id: "c5", name: "No ads", enabled: true },
        { id: "c6", name: "Sign-up bonus points", enabled: true, limit: 100 },
    ],
    creator: [
        { id: "b1", name: "All Club Member features", enabled: true },
        { id: "b2", name: "Custom branding", enabled: true },
        { id: "b3", name: "Analytics dashboard", enabled: true },
        { id: "b4", name: "Bulk tournament creation", enabled: true },
        { id: "b5", name: "API access", enabled: false },
        { id: "b6", name: "Priority support", enabled: true },
    ],
}

export default function FeaturesToggle() {
    const [selectedTier, setSelectedTier] = useState<TierId>("free")
    const [features, setFeatures] = useState<Record<TierId, FeatureItem[]>>({
        free: TIER_FEATURES.free.map((f) => ({ ...f })),
        club: TIER_FEATURES.club.map((f) => ({ ...f })),
        creator: TIER_FEATURES.creator.map((f) => ({ ...f })),
    })
    const [newFeatureName, setNewFeatureName] = useState("")
    const [newFeatureLimit, setNewFeatureLimit] = useState("")

    const currentFeatures = features[selectedTier]

    const stats = useMemo(() => {
        const total = currentFeatures.length
        const enabled = currentFeatures.filter((f) => f.enabled).length
        const disabled = total - enabled
        return { total, enabled, disabled }
    }, [currentFeatures])

    const handleToggle = (id: string, checked: boolean) => {
        setFeatures((prev) => ({
            ...prev,
            [selectedTier]: prev[selectedTier].map((f) =>
                f.id === id ? { ...f, enabled: checked } : f
            ),
        }))
    }

    const handleLimitChange = (id: string, value: string) => {
        const num = value === "" ? undefined : parseInt(value, 10)
        setFeatures((prev) => ({
            ...prev,
            [selectedTier]: prev[selectedTier].map((f) =>
                f.id === id ? { ...f, limit: num ?? undefined } : f
            ),
        }))
    }

    const handleAddFeature = () => {
        if (!newFeatureName.trim()) return
        const limit = newFeatureLimit.trim() ? parseInt(newFeatureLimit, 10) : undefined
        const newItem: FeatureItem = {
            id: `new-${Date.now()}`,
            name: newFeatureName.trim(),
            enabled: true,
            limit: limit !== undefined && !Number.isNaN(limit) ? limit : undefined,
        }
        setFeatures((prev) => ({
            ...prev,
            [selectedTier]: [...prev[selectedTier], newItem],
        }))
        setNewFeatureName("")
        setNewFeatureLimit("")
    }

    const tierDisplayName = TIER_LABELS[selectedTier]

    return (
        <div className="space-y-6">
            <div className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 p-6">
                <h2 className="text-xl font-semibold text-emerald-400">Feature Toggles</h2>
                <p className="mt-1 text-sm text-zinc-400">
                    Enable or disable specific features on the platform
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none">
                    <CardContent className="pt-6">
                        <p className="text-sm text-zinc-400">Total Features</p>
                        <p className="text-2xl font-bold text-white">{stats.total}</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none">
                    <CardContent className="pt-6">
                        <p className="text-sm text-zinc-400">Enabled</p>
                        <p className="text-2xl font-bold text-white">{stats.enabled}</p>
                    </CardContent>
                </Card>
                <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none">
                    <CardContent className="pt-6">
                        <p className="text-sm text-zinc-400">Disabled</p>
                        <p className="text-2xl font-bold text-white">{stats.disabled}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-white">Select Tier</p>
                    <div className="flex flex-wrap gap-2">
                        {(Object.keys(TIER_LABELS) as TierId[]).map((tier) => (
                            <Button
                                key={tier}
                                type="button"
                                variant="outline"
                                size="sm"
                                className={cn(
                                    "rounded-lg",
                                    selectedTier === tier
                                        ? "border-emerald-600 bg-emerald-800/60 text-white hover:bg-emerald-700/60"
                                        : "border-emerald-700/60 bg-transparent text-emerald-400 hover:bg-emerald-900/40"
                                )}
                                onClick={() => setSelectedTier(tier)}
                            >
                                {TIER_LABELS[tier]}
                            </Button>
                        ))}
                    </div>
                </div>
                <Button
                    type="button"
                    className="rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 shrink-0"
                >
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-white">
                            Features List
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <ul className="max-h-[320px] space-y-3 overflow-y-auto no-scrollbar  pr-1">
                            {currentFeatures.map((feature) => (
                                <li
                                    key={feature.id}
                                    className="flex flex-wrap items-center gap-2 rounded-lg border border-emerald-800/40 bg-emerald-900/20 px-3 py-2"
                                >
                                    {feature.limit != null ? (
                                        <>
                                            <span className="min-w-0 flex-1 text-sm text-white">
                                                {feature.name}
                                            </span>
                                            <Input
                                                type="number"
                                                value={feature.limit ?? ""}
                                                onChange={(e) =>
                                                    handleLimitChange(feature.id, e.target.value)
                                                }
                                                className="h-8 w-14 rounded border-zinc-600 bg-background text-white"
                                            />
                                            {feature.enabled ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggle(feature.id, false)}
                                                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-400 transition-colors"
                                                    aria-label="Disable feature"
                                                >
                                                    <Check className="size-3.5" strokeWidth={3} />
                                                </button>
                                            ) : (
                                                <Checkbox
                                                    checked={false}
                                                    onCheckedChange={(checked) =>
                                                        handleToggle(feature.id, checked === true)
                                                    }
                                                    className="border-zinc-500 data-[state=checked]:bg-emerald-600"
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <span className="min-w-0 flex-1 text-sm text-white">
                                                {feature.name}
                                            </span>
                                            {feature.enabled ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggle(feature.id, false)}
                                                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-400 transition-colors"
                                                    aria-label="Disable feature"
                                                >
                                                    <Check className="size-3.5" strokeWidth={3} />
                                                </button>
                                            ) : (
                                                <Checkbox
                                                    checked={false}
                                                    onCheckedChange={(checked) =>
                                                        handleToggle(feature.id, checked === true)
                                                    }
                                                    className="border-zinc-500 data-[state=checked]:bg-emerald-600"
                                                />
                                            )}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-white">
                            Add new features for {tierDisplayName} tier
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                        <Input
                            placeholder="Enter Feature name"
                            value={newFeatureName}
                            onChange={(e) => setNewFeatureName(e.target.value)}
                            className="rounded-lg border-zinc-700 bg-background text-white placeholder:text-zinc-500"
                        />
                        <Input
                            placeholder="e.g., 20"
                            value={newFeatureLimit}
                            onChange={(e) => setNewFeatureLimit(e.target.value)}
                            className="rounded-lg border-zinc-700 bg-background text-white placeholder:text-zinc-500 "
                        />
                        <Button
                            type="button"
                            className="rounded-lg bg-emerald-700 text-white hover:bg-emerald-600"
                            onClick={handleAddFeature}
                        >
                            Add
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
