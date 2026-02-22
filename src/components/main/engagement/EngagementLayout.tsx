import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import EngagementStats from "./EngagementStats"
import DailyActiveUsersChart from "./DailyActiveUsersChart"
import EngagementMetricsChart from "./EngagementMetricsChart"
import UserRetentionChart from "./UserRetentionChart"

export default function EngagementLayout() {
  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Engagement Analytics"
        description="Track user engagement and platform activity"
      />
      <EngagementStats />
      <DailyActiveUsersChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EngagementMetricsChart />
        <UserRetentionChart />
      </div>
    </div>
  )
}
