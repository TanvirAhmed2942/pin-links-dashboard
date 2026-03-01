import { Card, CardContent } from "@/components/ui/card"
import { Award, CheckCircle, Users, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
    {
        label: "Total Raffles",
        value: "6",
        icon: Award,
        iconBg: "bg-emerald-700/80",
    },
    {
        label: "Active Raffles",
        value: "3",
        icon: CheckCircle,
        iconBg: "bg-emerald-500",
    },
    {
        label: "Total Entries",
        value: "1,847",
        icon: Users,
        iconBg: "bg-blue-500",
    },
    {
        label: "Total Revenue",
        value: "$870.00",
        icon: DollarSign,
        iconBg: "bg-orange-500",
    },
]

export default function AllRafflesStat() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <Card
                    key={stat.label}
                    className="rounded-xl border-2 bg-card shadow-none overflow-hidden h-full"
                >
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div
                                className={cn(
                                    "flex size-10 shrink-0 items-center justify-center rounded-lg text-white",
                                    stat.iconBg
                                )}
                            >
                                <stat.icon className="size-5" strokeWidth={2} />
                            </div>
                            <span className="text-sm font-medium text-zinc-400">
                                {stat.label}
                            </span>
                        </div>
                        <p className="mt-3 text-2xl font-bold tracking-tight text-white">
                            {stat.value}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
