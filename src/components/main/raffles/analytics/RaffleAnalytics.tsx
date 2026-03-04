import React from "react"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import AnalyticsStats from "./AnalyticsStats"
import RevenueEntryTrends from "./Revenue&EntryTrends"
import ParticipationByMemberType from "./ParticipationByMemberType"
import TopGivingCategory from "./TopGivingCategory"
import TopGivingBrand from "./TopGivingBrand"

function RaffleAnalytics() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Raffle Analytics"
        description="Track raffle analytics and performance"
      />
      <AnalyticsStats />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <RevenueEntryTrends />
        <ParticipationByMemberType />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <TopGivingCategory />
        <TopGivingBrand />
      </div>
    </div>
  )
}

export default RaffleAnalytics