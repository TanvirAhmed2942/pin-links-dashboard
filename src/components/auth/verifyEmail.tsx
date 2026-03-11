"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation"

export default function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/auth/reset-password")
  }

  const handleResendOtp = () => {
    // Resend handled by parent or auth layer
  }

  return (
    <Card className="w-full max-w-md border-border/50 bg-card/80 shadow-2xl backdrop-blur-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-sidebar-foreground">
          Verify Email
        </CardTitle>
        <CardDescription className="text-sidebar-foreground">
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="text-sidebar-foreground"
            >
              <InputOTPGroup className="text-sidebar-foreground">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator className="text-sidebar-foreground" />
              <InputOTPGroup className="text-sidebar-foreground">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <p className="flex items-center justify-center gap-2 text-center text-sm text-sidebar-foreground">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 font-bold text-sidebar-foreground hover:underline"
              onClick={handleResendOtp}
            >
              Resend
            </button>
          </p>
          <Button
            type="submit"
            disabled={otp.length !== 6}
            className="w-full bg-[#0b2f21] py-2.5 font-medium text-white transition-all duration-200 hover:bg-[#0b2f21] hover:text-white hover:shadow-lg hover:shadow-[#6FAE97]/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
