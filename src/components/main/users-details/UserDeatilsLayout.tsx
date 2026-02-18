"use client"

import UserDetailsHeader from "./UserDetailsHeader"
import UserDetailsProfile from "./UserDetailsProfile"
import PersonalInformationCard from "./PersonalInformationCard"
import GolfStatsCard from "./GolfStatsCard"
import SubscriptionCard from "./SubscriptionCard"
import SubscriptionHistoryCard from "./SubscriptionHistoryCard"
import PointsBreakdownCard from "./PointsBreakdownCard"
import ReportContentCard from "./ReportContentCard"
import TournamentParticipationCard from "./TournamentParticipationCard"

// Mock data for user details (in real app fetch by id)
function getMockUserDetails(id: string) {
  return {
    name: "John Smith",
    userId: id,
    status: "active" as const,
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinedDate: "Jan 15, 2024",
    handicap: "12.4",
    totalPoints: "775",
    tournamentsPlayed: 3,
    subscription: "Pro" as const,
    memberSince: "Jan 15, 2024",
    lastActive: "2 hours ago",
    subscriptionHistory: [
      {
        plan: "Pro",
        startDate: "Jan 15, 2024",
        endDate: "Jan 15, 2025",
        amount: "$99.99",
        status: "Active" as const,
      },
      {
        plan: "Free",
        startDate: "Dec 1, 2023",
        endDate: "Jan 14, 2024",
        amount: "$0.00",
        status: "Completed" as const,
      },
    ],
    pointsBreakdown: [
      { activity: "Tournament Win - Spring Championship", points: "+500", date: "Jun 10, 2024" },
      { activity: "Course Rating - Pebble Beach", points: "+50", date: "Jun 8, 2024" },
      { activity: "Tournament Participation - Weekend Warriors", points: "+200", date: "Jun 5, 2024" },
      { activity: "Scorecard Post", points: "+25", date: "Jun 3, 2024" },
    ],
    reports: [
      { reason: "Inappropriate Content", date: "May 15, 2024", userName: "Nick" },
    ],
    tournaments: ["Spring Championship", "Weekend Warriors", "Spring Championship"],
  }
}

type UserDetailsLayoutProps = {
  userId: string
}

export default function UserDetailsLayout({ userId }: UserDetailsLayoutProps) {
  const user = getMockUserDetails(userId)

  return (
    <div className="space-y-6">
      <UserDetailsHeader onSuspend={() => { }} />

      <UserDetailsProfile
        name={user.name}
        userId={user.userId}
        status={user.status}
        initials="JS"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        <PersonalInformationCard
          email={user.email}
          phone={user.phone}
          location={user.location}
          joinedDate={user.joinedDate}
        />
        <GolfStatsCard
          handicap={user.handicap}
          totalPoints={user.totalPoints}
          tournamentsPlayed={user.tournamentsPlayed}
        />
        <SubscriptionCard
          plan={user.subscription}
          memberSince={user.memberSince}
          lastActive={user.lastActive}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2">
          <SubscriptionHistoryCard rows={user.subscriptionHistory} />
        </div>
        <PointsBreakdownCard totalPoints={user.totalPoints} rows={user.pointsBreakdown} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ReportContentCard reportCount={user.reports.length} rows={user.reports} />
        <div className="md:col-span-2">
          <TournamentParticipationCard
            tournamentCount={user.tournaments.length}
            tournaments={user.tournaments}
          />
        </div>
      </div>
    </div>
  )
}
