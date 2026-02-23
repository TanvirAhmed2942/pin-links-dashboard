"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, User, Gem } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type ReportStatus = "Open" | "In Progress" | "Resolved"

const STATUS_OPTIONS: ReportStatus[] = ["Open", "In Progress", "Resolved"]

// Mock data for report detail (matches image)
const MOCK_REPORT: {
  id: string
  title: string
  reporterName: string
  reporterEmail: string
  status: ReportStatus
  created: string
  lastUpdated: string
  description: string
  comments: { author: string; role: string; date: string; text: string }[]
} = {
  id: "303",
  title: "Course rating not updating",
  reporterName: "Emma Wilson",
  reporterEmail: "emma.wilson@email.com",
  status: "Open",
  created: "Jun 15, 2024",
  lastUpdated: "Jun 15, 2024",
  description:
    "The leaderboard on the tournament detail page is displaying scores that don't match the actual submitted scorecards. This issue appears to be affecting multiple tournaments.",
  comments: [
    {
      author: "Alice Johnson",
      role: "Super Admin",
      date: "Jun 15, 2024 3:15 PM",
      text: "Investigating this issue. It appears to be related to the score aggregation logic.",
    },
  ],
}

function StatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white",
        status === "In Progress" && "bg-amber-500",
        status === "Open" && "bg-red-500",
        status === "Resolved" && "bg-emerald-500"
      )}
    >
      {status}
    </span>
  )
}

export default function ViewDetails() {
  const params = useParams()
  const id = (params?.id as string) ?? "303"
  const [status, setStatus] = useState<ReportStatus>(MOCK_REPORT.status)
  const [comment, setComment] = useState("")

  const report = { ...MOCK_REPORT, id, status }

  const handleMarkResolved = () => setStatus("Resolved")
  const handleUpdateStatus = () => {} // TODO: persist
  const handleAddComment = () => {
    if (!comment.trim()) return
    // TODO: add comment to list
    setComment("")
  }

  return (
    <div className="space-y-4">
      <Link
        href="/dashboard/reports"
        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="size-4" />
        Back to Reports
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{report.title}</h1>
          <p className="mt-1 text-sm text-zinc-400">Report ID: {report.id}</p>
        </div>
        <Button
          className="bg-emerald-600 text-white hover:bg-emerald-500"
          onClick={handleMarkResolved}
        >
          Mark as Resolved
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-medium text-white">
              <User className="size-4 text-zinc-400" />
              Reporter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <div>
              <p className="text-xs text-zinc-500">Name</p>
              <p className="text-sm text-white">{report.reporterName}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Email</p>
              <p className="text-sm text-white">{report.reporterEmail}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-medium text-white">
              <Gem className="size-4 text-zinc-400" />
              Classification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            <div>
              <p className="text-xs text-zinc-500">Status</p>
              <StatusBadge status={status} />
            </div>
            <div className="flex justify-between gap-2">
              <div>
                <p className="text-xs text-zinc-500">Created</p>
                <p className="text-sm text-white">{report.created}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500">Last Updated</p>
                <p className="text-sm text-white">{report.lastUpdated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium text-white">
            Description
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-zinc-200 leading-relaxed">
            {report.description}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-white">
              Comments & Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {report.comments.map((c, i) => (
              <div key={i} className="flex gap-3">
                <Avatar className="size-9 shrink-0 rounded-full border border-emerald-800/50 bg-emerald-800/60">
                  <AvatarFallback className="text-xs font-medium text-white">
                    {c.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-sm font-medium text-white">
                      {c.author}
                    </span>
                    <span className="text-xs text-zinc-500">{c.role}</span>
                    <span className="text-xs text-zinc-500">{c.date}</span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-200">{c.text}</p>
                </div>
              </div>
            ))}
            <div className="space-y-2 pt-2">
              <textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[80px] w-full rounded-md border border-emerald-800/60 bg-emerald-900/40 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
                rows={3}
              />
              <Button
                className="bg-emerald-800 text-white hover:bg-emerald-700"
                onClick={handleAddComment}
              >
                Add Comment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-emerald-900/50 bg-emerald-950/30 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-white">
              Update Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as ReportStatus)}
              >
                <SelectTrigger className="w-[140px] border-emerald-800/60 bg-emerald-900/40 text-white [&_svg]:text-zinc-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-emerald-800/60 bg-emerald-950">
                  {STATUS_OPTIONS.map((opt) => (
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
              <Button
                className="bg-emerald-800 text-white hover:bg-emerald-700"
                onClick={handleUpdateStatus}
              >
                Update Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
