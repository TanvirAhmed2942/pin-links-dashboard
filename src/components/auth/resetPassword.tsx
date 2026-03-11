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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/auth/login")
  }

  const isDisabled =
    newPassword !== confirmPassword || newPassword.length < 6

  return (
    <Card className="w-full max-w-md border-border/50 bg-card/80 shadow-2xl backdrop-blur-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-sidebar-foreground">
          Reset Password
        </CardTitle>
        <CardDescription className="text-sidebar-foreground">
          Enter your new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="newPassword"
              className="font-medium text-sidebar-foreground"
            >
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-border/50 bg-input/60 pl-10 pr-10 text-sidebar-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-ring"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 text-sidebar-foreground hover:bg-transparent hover:text-sidebar-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="font-medium text-sidebar-foreground"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-border/50 bg-input/60 pl-10 pr-10 text-sidebar-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-ring"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 text-sidebar-foreground hover:bg-transparent hover:text-sidebar-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isDisabled}
            className="w-full bg-[#0b2f21] py-2.5 font-medium text-white transition-all duration-200 hover:bg-[#0b2f21] hover:text-white hover:shadow-lg hover:shadow-[#6FAE97]/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset Password
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
