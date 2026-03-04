"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"

const DOCUMENTS = [
  {
    id: "1",
    title: "Terms of Service",
    status: "published" as const,
    lastUpdated: "2024-02-15",
    wordCount: "3,542",
  },
  {
    id: "2",
    title: "Privacy Policy",
    status: "published" as const,
    lastUpdated: "2024-02-15",
    wordCount: "2,876",
  },
  {
    id: "3",
    title: "FAQ's",
    status: "published" as const,
    lastUpdated: "2024-01-20",
    wordCount: "1,234",
  },
  {
    id: "4",
    title: "About Us",
    status: "draft" as const,
    lastUpdated: "2024-02-18",
    wordCount: "1,567",
  },
]

const totalDocs = 5
const publishedCount = 4
const draftCount = 1

export default function LegalDocuments() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 p-6">
        <h2 className="text-xl font-bold text-white">Legal Documents</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Modify or update terms of service, privacy policies, and other legal
          documents
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none">
          <CardContent className="pt-6">
            <p className="text-sm text-zinc-400">Total Documents</p>
            <p className="text-2xl font-bold text-white">{totalDocs}</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none">
          <CardContent className="pt-6">
            <p className="text-sm text-zinc-400">Published</p>
            <p className="text-2xl font-bold text-white">{publishedCount}</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none">
          <CardContent className="pt-6">
            <p className="text-sm text-zinc-400">In Draft</p>
            <p className="text-2xl font-bold text-white">{draftCount}</p>
          </CardContent>
        </Card>
      </div>

      <ul className="space-y-4">
        {DOCUMENTS.map((doc) => (
          <li key={doc.id}>
            <Card className="rounded-xl border-2 border-emerald-900/50 bg-emerald-950/40 shadow-none overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-emerald-700/50 bg-emerald-900/30 text-white">
                      <FileText className="size-6" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-white">{doc.title}</h3>
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                            doc.status === "published"
                              ? "bg-emerald-600/80 text-white"
                              : "bg-orange-500/80 text-white"
                          )}
                        >
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Last updated: {doc.lastUpdated} • {doc.wordCount} words
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    className="shrink-0 gap-2 bg-zinc-700 text-white hover:bg-zinc-600"
                    onClick={() => {}}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
