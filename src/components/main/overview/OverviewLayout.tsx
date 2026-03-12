import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import Stats from './Stats'
import UserGrowth from './charts/UserGrowth'
import RevenueGrowth from './charts/RevenueGrowth'
import ActiveVsInactiveUsers from './charts/ActiveVsInactiveUsers'
import WeeklyEngagement from './charts/WeeklyEngagement'
import RecentActivity from './RecentActivity'


function OverviewLayout() {
    return (
        <div className="space-y-4">
            <SmallPageInfo title="Dashboard Overview" description="Welcome back! Here's what's happening with PinLinks today." />
            <Stats />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UserGrowth />
                <RevenueGrowth />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ActiveVsInactiveUsers />
                <WeeklyEngagement />
            </div>
            <RecentActivity />
        </div>
    )
}

export default OverviewLayout