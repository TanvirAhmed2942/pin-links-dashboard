"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Activity = {
  profile?: string
  initials: string
  name: string
  action: string
  time: string
}

const activities: Activity[] = [
  {
    profile: "https://github.com/shadcn.png",
    initials: "JS",
    name: "John Smith",
    action: "Created tournament 'Spring Championship'",
    time: "2 min ago",
  },
  {
    initials: "EW",
    name: "Emma Wilson",
    action: "Rated Pebble Beach Golf Course - 5 stars",
    time: "15 min ago",
  },
  {
    initials: "MB",
    name: "Michael Brown",
    action: "Upgraded to Pro subscription",
    time: "1 hour ago",
  },
  {
    initials: "SD",
    name: "Sarah Davis",
    action: "Won tournament 'Weekend Warriors'",
    time: "2 hours ago",
  },
  {
    initials: "DJ",
    name: "David Johnson",
    action: "Posted new scorecard",
    time: "3 hours ago",
  },
]

export default function RecentActivity() {
  return (
    <Card className="border-2 rounded-3xl shadow-none bg-card">
      <CardHeader>
        <CardTitle className="text-white font-bold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-6 pb-6">
        <ul className="divide-y-2 divide-border">
          {activities.map((item) => (
            <li
              key={`${item.name}-${item.time}`}
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <Avatar size="sm" className="size-10 shrink-0 rounded-full bg-emerald-800 text-white border-0" >
                <AvatarImage src={item.profile} alt={item.name} />
                <AvatarFallback className="bg-emerald-800 text-white text-sm font-medium">
                  {item.initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-white">
                  <span className="font-bold">{item.name}</span>{" "}
                  <span className="font-normal">{item.action}</span>
                </p>
                <p className="text-sm text-emerald-200/70">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
