"use client"

import BackButton from "@/components/common/backbutton/BackButton"
import { Button } from "@/components/ui/button"

type UserDetailsHeaderProps = {
  onSuspend?: () => void
}

export default function UserDetailsHeader({ onSuspend }: UserDetailsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <BackButton href="/dashboard/users" label="Back to Users" />
      <Button
        variant="outline"
        className="rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-500 border-red-500 hover:border-red-500"
        onClick={onSuspend}
      >
        Suspend Account
      </Button>
    </div>
  )
}
