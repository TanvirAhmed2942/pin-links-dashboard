


import {
    Users,
    UserCheck,
    CreditCard,
    MapPin,
    DollarSign,
    type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type StatItem = {
    title: string
    value: string
    icon: LucideIcon
}

const defaultStats: StatItem[] = [
    { title: "Total Users", value: "5,300", icon: Users },
    { title: "Active Users", value: "4,234", icon: UserCheck },
    { title: "Pro Subscribers", value: "1,847", icon: CreditCard },
    { title: "Total Courses Rated", value: "2,156", icon: MapPin },
    { title: "Total Revenue", value: "$53,700", icon: DollarSign },
]

type StatsProps = {
    items?: StatItem[]
}

function Stats({ items = defaultStats }: StatsProps) {
    return (
        <div className="flex flex-wrap gap-4 lg:h-28">
            {items.map((item) => {
                const Icon = item.icon
                return (
                    <Card
                        key={item.title}
                        className="flex flex-1 min-w-[180px] h-full flex-row items-center justify-between gap-4 border-2 rounded-3xl  px-5 py-4 text-white shadow-none"
                    >
                        <CardContent className="flex flex-1 flex-row items-center justify-between gap-4 p-0 h-full">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-medium text-emerald-100/90">
                                    {item.title}
                                </span>
                                <span className="text-2xl font-bold tracking-tight">
                                    {item.value}
                                </span>
                            </div>
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-700/80">
                                <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default Stats
