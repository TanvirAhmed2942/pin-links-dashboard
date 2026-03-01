"use client"

import { Play } from "lucide-react"
import BackButton from "@/components/common/backbutton/BackButton"
import { Button } from "@/components/ui/button"
import ViewRaffleStats from "./ViewRaffleStats"
import RecentEntriesTable, { type EntryRow } from "./RecentEntriesTable"
import RaffleDetailsCard from "./RaffleDetailsCard"
import MemberDistributionCard from "./MemberDistributionCard"
import RaffleProgressCard from "./RaffleProgressCard"
import WinnerCard from "./WinnerCard"

export type ViewRaffleData = {
  title: string
  status: "active" | "ended" | "drawn" | "draft"
  totalEntries: number
  totalRevenue: string
  clubMembers: number
  avgDailyEntries: number
  eligibility: string
  startDate: string
  endDate: string
  maxEntries: number
  memberDistribution: { clubMembers: number; freeMembers: number }
  recentEntries: EntryRow[]
  winner?: { name: string; email: string; drawnDate: string } | null
}

// Mock data per raffle id for demo (in real app, fetch by raffleId)
function getMockRaffleData(raffleId: string): ViewRaffleData {
  const base = {
    title: "Premium Golf Club Set",
    eligibility: "Club Members Only",
    startDate: "2024-02-01",
    endDate: "2024-03-15",
    maxEntries: 500,
    memberDistribution: { clubMembers: 320, freeMembers: 67 },
    recentEntries: [
      { userName: "John Smith", email: "john@example.com", type: "Club", date: "2024-02-05", amount: "$10.00", status: "paid" },
      { userName: "Sarah Johnson", email: "sarah@example.com", type: "Club", date: "2024-02-06", amount: "$10.00", status: "paid" },
      { userName: "Mike Wilson", email: "mike@example.com", type: "Club", date: "2024-02-07", amount: "$10.00", status: "paid" },
      { userName: "Emily Brown", email: "emily@example.com", type: "Club", date: "2024-02-08", amount: "$10.00", status: "paid" },
      { userName: "David Lee", email: "david@example.com", type: "Club", date: "2024-02-09", amount: "$10.00", status: "paid" },
    ] as EntryRow[],
  }

  switch (raffleId) {
    case "1":
      return {
        ...base,
        status: "active",
        totalEntries: 387,
        totalRevenue: "$3,870",
        clubMembers: 5,
        avgDailyEntries: 19,
        winner: null,
      }
    case "2":
      return {
        ...base,
        status: "ended",
        totalEntries: 500,
        totalRevenue: "$5,000",
        clubMembers: 8,
        avgDailyEntries: 25,
        winner: null,
      }
    case "3":
      return {
        ...base,
        status: "drawn",
        totalEntries: 387,
        totalRevenue: "$3,870",
        clubMembers: 5,
        avgDailyEntries: 19,
        winner: { name: "John Smith", email: "john.smith@example.com", drawnDate: "2024-01-02" },
      }
    case "4":
      return {
        ...base,
        status: "draft",
        totalEntries: 0,
        totalRevenue: "$0",
        clubMembers: 0,
        avgDailyEntries: 0,
        memberDistribution: { clubMembers: 0, freeMembers: 0 },
        recentEntries: [],
        winner: null,
      }
    default:
      return {
        ...base,
        status: "active",
        totalEntries: 387,
        totalRevenue: "$3,870",
        clubMembers: 5,
        avgDailyEntries: 19,
        winner: null,
      }
  }
}

type ViewRaffleLayoutProps = {
  raffleId: string
}

export default function ViewRaffleLayout({ raffleId }: ViewRaffleLayoutProps) {
  const data = getMockRaffleData(raffleId)
  const showDrawButton = data.status === "ended"

  return (
    <div className="space-y-4">
      <BackButton href="/dashboard/raffles/all-raffles" label="Back to Raffles" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">{data.title}</h1>
        {showDrawButton && (
          <Button
            className="bg-amber-500 text-black hover:bg-amber-400 border border-black/20"
          >
            <Play className="size-4 mr-2" />
            Draw Winner
          </Button>
        )}
      </div>

      <ViewRaffleStats
        data={{
          totalEntries: data.totalEntries,
          totalRevenue: data.totalRevenue,
          clubMembers: data.clubMembers,
          avgDailyEntries: data.avgDailyEntries,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentEntriesTable
            entries={data.recentEntries}
            totalCount={data.totalEntries}
            raffleId={raffleId}
          />
        </div>
        <div className="space-y-4">
          <RaffleDetailsCard
            data={{
              status: data.status,
              eligibility: data.eligibility,
              startDate: data.startDate,
              endDate: data.endDate,
            }}
          />
          <MemberDistributionCard data={data.memberDistribution} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RaffleProgressCard
            data={{ entries: data.totalEntries, maxEntries: data.maxEntries }}
          />
        </div>
        {data.status === "drawn" && data.winner && (
          <WinnerCard data={data.winner} />
        )}
      </div>
    </div>
  )
}
