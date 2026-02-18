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
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
    },
    {
      title: "Subscriptions",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Plans",
          url: "#",
        },
        {
          title: "Transactions",
          url: "#",
        },
      ],
    },
    {
      title: "Courses",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Tournaments",
      url: "#",
      icon: Trophy,
    }, {
      title: "Moderation",
      url: "#",
      icon: ShieldCheck,
      items: [
        {
          title: "Posts",
          url: "#",
        }
      ],
    }, {
      title: "Analytics",
      url: "#",
      icon: ChartLine,
      items: [
        {
          title: "Engagement",
          url: "#",
        }
      ],
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
        <Image src="/logo.svg" alt="Logo" width={500} height={500} className="w-full h-full object-contain" />
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
