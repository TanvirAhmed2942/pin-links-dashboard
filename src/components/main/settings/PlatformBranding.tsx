"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image, FileText } from "lucide-react"

export default function PlatformBranding() {
  const [logoPath, setLogoPath] = useState("/uploads/pinlinks-logo.svg")
  const [appName, setAppName] = useState("PinLinks Golf Platform")

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 p-6">
        <h2 className="text-xl font-bold text-white">Platform Branding</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Control logos, images, text, and other assets used within the platform
        </p>
      </div>

      <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border-2 border-emerald-600/60 bg-emerald-900/30 text-emerald-400">
              <Image className="size-6" />
            </div>
            <div className="min-w-0 space-y-1">
              <h3 className="text-lg font-semibold text-white">Main Logo</h3>
              <p className="text-sm text-zinc-400">
                Primary logo used in navigation and marketing
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Input
              value={logoPath}
              onChange={(e) => setLogoPath(e.target.value)}
              className="flex-1 rounded-lg border-zinc-700 bg-zinc-800/80 text-emerald-400 placeholder:text-zinc-500 focus-visible:ring-emerald-500"
              readOnly
            />
            <Button
              variant="secondary"
              className="shrink-0 bg-zinc-700 text-white hover:bg-zinc-600"
            >
              Upload Logo
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border-2 border-emerald-600/60 bg-emerald-900/30 text-emerald-400">
              <FileText className="size-6" />
            </div>
            <div className="min-w-0 space-y-1">
              <h3 className="text-lg font-semibold text-white">
                Application Name
              </h3>
              <p className="text-sm text-zinc-400">
                Displayed in page titles and headers
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Input
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="flex-1 rounded-lg border-zinc-700 bg-zinc-800/80 text-emerald-400 placeholder:text-zinc-500 focus-visible:ring-emerald-500"
            />
            <Button
              variant="secondary"
              className="shrink-0 bg-zinc-700 text-white hover:bg-zinc-600"
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
