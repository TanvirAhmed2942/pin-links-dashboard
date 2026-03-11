import type { Metadata } from "next"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Bell } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 bg-sidebar transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center justify-between gap-2 px-4">
            <SidebarTrigger className="-ml-1 size-10 cursor-pointer rounded-lg p-2 text-sidebar-foreground hover:bg-[#184f3a]/50 hover:text-sidebar-foreground/90" />
            <div className="size-10 cursor-pointer rounded-full bg-[#0b2f21] p-2 text-sidebar-accent-foreground hover:bg-[#184f3a]/50 hover:text-sidebar-accent-foreground/90">
              <Bell className="text-[#6FAE97]" />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 rounded-lg p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
