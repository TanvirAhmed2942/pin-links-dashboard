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
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard/overview")
  }

  return (
    <Card className="w-full max-w-md border-border/50 bg-card/80 shadow-2xl backdrop-blur-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-sidebar-foreground">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-sidebar-foreground">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-sidebar-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-border/50 bg-input/60 pl-10 text-card-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-ring"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="font-medium text-sidebar-foreground"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-border/50 bg-input/60 pl-10 pr-10 text-card-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-ring"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="h-4 w-4 rounded border-border/50 bg-input/60 text-secondary"
              />
              <Label
                htmlFor="remember"
                className="text-sm text-sidebar-foreground"
              >
                Remember me
              </Label>
            </div>
            <Button
              type="button"
              variant="link"
              className="cursor-pointer px-0 text-sm text-sidebar-foreground hover:text-sidebar-foreground/80"
              onClick={() => router.push("/auth/forgot-password")}
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0b2f21] py-2.5 font-medium text-white transition-all duration-200 hover:bg-[#0b2f21] hover:text-white hover:shadow-lg hover:shadow-[#6FAE97]/25"
          >
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
