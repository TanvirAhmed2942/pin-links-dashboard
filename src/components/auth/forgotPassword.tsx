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
import { Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/auth/verify-email")
  }

  return (
    <Card className="w-full max-w-md border-border/50 bg-card/80 shadow-2xl backdrop-blur-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-sidebar-foreground">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-sidebar-foreground">
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-sidebar-foreground">
              Enter your email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email to reset your password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border/50 bg-input/60 pl-10 text-card-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0b2f21] py-2.5 font-medium text-white transition-all duration-200 hover:bg-[#0b2f21] hover:text-white hover:shadow-lg hover:shadow-[#6FAE97]/25"
          >
            Reset Password
          </Button>
        </form>
      </CardContent>
    </Card >
  )
}
