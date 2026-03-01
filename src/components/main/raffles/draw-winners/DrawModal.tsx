"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Shuffle, Trophy, Play, Users, Mail, Phone, X, Check } from "lucide-react"

export type DrawParticipant = {
  name: string
  email: string
  phone?: string
  entryDate?: string
  memberType?: string
}

const MOCK_PARTICIPANTS: DrawParticipant[] = [
  { name: "Sarah Johnson", email: "sarah@example.com", phone: "+1 234-567-8901", entryDate: "2024-02-05", memberType: "Club Member" },
  { name: "Mike Wilson", email: "mike@example.com", phone: "+1 234-567-8903", entryDate: "2024-02-07", memberType: "Club Member" },
  { name: "John Smith", email: "john.smith@example.com", phone: "+1 234-567-8900", entryDate: "2024-02-01", memberType: "Club Member" },
  { name: "Emily Brown", email: "emily@example.com", phone: "+1 234-567-8902", entryDate: "2024-02-06", memberType: "Free Member" },
  { name: "David Lee", email: "david@example.com", phone: "+1 234-567-8904", entryDate: "2024-02-08", memberType: "Club Member" },
]

const DRAW_DURATION_MS = 2500
const CYCLING_INTERVAL_MS = 180

type DrawStep = "ready" | "drawing" | "winner"

export type DrawModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  raffleName?: string
  eligibleEntries?: number
  participants?: DrawParticipant[]
  onConfirmWinner?: (winner: DrawParticipant) => void
}

export default function DrawModal({
  open,
  onOpenChange,
  raffleName = "Premium Golf Club Set",
  eligibleEntries = 500,
  participants = MOCK_PARTICIPANTS,
  onConfirmWinner,
}: DrawModalProps) {
  const [step, setStep] = useState<DrawStep>("ready")
  const [displayParticipant, setDisplayParticipant] = useState<DrawParticipant | null>(null)
  const [winner, setWinner] = useState<DrawParticipant | null>(null)

  const resetModal = useCallback(() => {
    setStep("ready")
    setDisplayParticipant(null)
    setWinner(null)
  }, [])

  useEffect(() => {
    if (!open) resetModal()
  }, [open, resetModal])

  useEffect(() => {
    if (!open || step !== "drawing" || participants.length === 0) return

    const endTime = Date.now() + DRAW_DURATION_MS
    const finalWinner = participants[Math.floor(Math.random() * participants.length)]

    const interval = setInterval(() => {
      const remaining = endTime - Date.now()
      if (remaining <= 0) {
        clearInterval(interval)
        setDisplayParticipant(finalWinner)
        setWinner(finalWinner)
        setStep("winner")
        return
      }
      const randomIndex = Math.floor(Math.random() * participants.length)
      setDisplayParticipant(participants[randomIndex])
    }, CYCLING_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [open, step, participants])

  const handleStartDraw = () => {
    setStep("drawing")
    setDisplayParticipant(participants[0] ?? null)
  }

  const handleRedraw = () => {
    setStep("ready")
    setDisplayParticipant(null)
    setWinner(null)
  }

  const handleConfirmWinner = () => {
    if (winner) onConfirmWinner?.(winner)
    onOpenChange(false)
    resetModal()
  }

  const handleCancel = () => {
    onOpenChange(false)
    resetModal()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-emerald-900/50 bg-emerald-950/95 text-zinc-100 overflow-hidden">
        <DialogHeader className="flex flex-col items-center text-center space-y-3 pb-2">
          <div className="flex size-12 items-center justify-center rounded-full bg-emerald-800/80 text-emerald-300">
            <Shuffle className="size-6" strokeWidth={2} />
          </div>
          <DialogTitle className="text-xl font-bold text-white">
            Random Winner Draw
          </DialogTitle>
          <p className="text-sm text-zinc-400">{raffleName}</p>
          <p className="text-sm text-zinc-500">{eligibleEntries} eligible entries</p>
        </DialogHeader>

        <div className="rounded-xl border border-emerald-800/50 bg-emerald-900/30 p-6 space-y-4">
          {step === "ready" && (
            <>
              <div className="flex flex-col items-center gap-3 text-center">
                <Trophy className="size-12 text-zinc-500" strokeWidth={1.5} />
                <p className="font-semibold text-white">Ready to draw winner</p>
                <p className="text-sm text-zinc-500">
                  Click the button below to randomly select a winner
                </p>
              </div>
            </>
          )}

          {step === "drawing" && displayParticipant && (
            <>
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-emerald-700/60 text-white">
                  <Users className="size-6" strokeWidth={2} />
                </div>
                <p className="font-semibold text-white text-lg">{displayParticipant.name}</p>
                <p className="text-sm text-zinc-400">{displayParticipant.email}</p>
                <p className="text-sm font-medium text-amber-400">Drawing...</p>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-lg bg-emerald-900/40 py-2.5">
                <Shuffle className="size-4 text-white" />
                <span className="text-sm font-medium text-white">Drawing...</span>
              </div>
            </>
          )}

          {step === "winner" && winner && (
            <div className="flex flex-col items-center gap-4 text-center">
              <Trophy className="size-10 text-amber-400" strokeWidth={1.5} fill="currentColor" />
              <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                {winner.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-medium">
                <Play className="size-3" />
                WINNER SELECTED
                <Play className="size-3" />
              </div>
              <p className="text-lg font-bold text-white">{winner.name}</p>
              <div className="flex flex-col gap-1 text-sm text-zinc-400">
                <span className="inline-flex items-center justify-center gap-1.5">
                  <Mail className="size-3.5" />
                  {winner.email}
                </span>
                {winner.phone && (
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <Phone className="size-3.5" />
                    {winner.phone}
                  </span>
                )}
              </div>
              {winner.memberType && (
                <span className="inline-flex rounded-full bg-emerald-900/80 px-3 py-1 text-xs font-medium text-white">
                  {winner.memberType}
                </span>
              )}
              {winner.entryDate && (
                <div className="w-full rounded-lg bg-zinc-800/60 px-3 py-2 text-left">
                  <p className="text-xs text-zinc-500">Entry Date</p>
                  <p className="text-sm font-medium text-white">{winner.entryDate}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-4 flex-row justify-center sm:justify-center">
          {step === "ready" && (
            <>
              <Button
                type="button"
                variant="outline"
                className="border-zinc-600 text-white hover:bg-zinc-800"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-emerald-600 text-white hover:bg-emerald-500 gap-2"
                onClick={handleStartDraw}
              >
                <Play className="size-4" />
                Start Draw
              </Button>
            </>
          )}
          {step === "drawing" && (
            <div className="w-full flex justify-center py-1">
              <span className="text-sm text-zinc-500">Selecting winner...</span>
            </div>
          )}
          {step === "winner" && (
            <>
              <Button
                type="button"
                variant="outline"
                className="border-emerald-700 bg-emerald-900/50 text-white hover:bg-emerald-800/50 gap-2"
                onClick={handleRedraw}
              >
                <X className="size-4" />
                Redraw
              </Button>
              <Button
                type="button"
                className="bg-emerald-600 text-white hover:bg-emerald-500 gap-2"
                onClick={handleConfirmWinner}
              >
                <Check className="size-4" />
                Confirm Winner
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
