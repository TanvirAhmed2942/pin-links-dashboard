"use client"

import * as React from "react"
import {
  BookOpen,
  CreditCard,
  Frame,
  Map,
  PieChart,
  Trophy,
  SquareTerminal,
  Users,
  ShieldCheck,
  ChartLine,
  Briefcase,
  Bug,
  Settings,
  Gift,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

const base_path = "/dashboard"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: `${base_path}/overview`,
      icon: SquareTerminal,
    },
    {
      title: "Users",
      url: `${base_path}/users`,
      icon: Users,
    },
    {
      title: "Subscriptions",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Plans",
          url: `${base_path}/subscription/plan`,
        },
        {
          title: "Transactions",
          url: `${base_path}/subscription/transactions`,
        },
      ],
    },
    {
      title: "Courses",
      url: `${base_path}/course`,
      icon: BookOpen,

    },
    {
      title: "Tournaments",
      url: `${base_path}/tournaments`,
      icon: Trophy,
    }, {
      title: "Moderation",
      url: "#",
      icon: ShieldCheck,
      items: [
        {
          title: "Posts",
          url: `${base_path}/moderations`,
        }
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartLine,
      items: [
        {
          title: "Engagement",
          url: `${base_path}/engagement`,
        }
      ],
    },
    {
      title: "Raffles",
      icon: Gift,
      items: [
        {
          title: "All Raffles",
          url: `${base_path}/raffles/all-raffles`,
        },
        {
          title: "Raffle Categories",
          url: `${base_path}/raffles/raffle-categories`,
        },
        {
          title: "Raffle Participants",
          url: `${base_path}/raffles/raffle-participants`,
        },
        {
          title: "Draw Winners",
          url: `${base_path}/raffles/draw-winners`,
        },
        {
          title: "Raffle Analytics",
          url: `${base_path}/raffles/analytics`,
        },
      ],

    },
    {
      title: "Reports",
      url: `${base_path}/reports`,
      icon: Bug,
    },
    {
      title: "Employees",
      url: `${base_path}/employee`,
      icon: Briefcase,
    },
    {
      title: "Settings",
      url: `${base_path}/settings`,
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-center p-4">
        <Image src="/logo.svg" alt="Logo" width={500} height={500} className=" w-auto h-auto object-cover" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
