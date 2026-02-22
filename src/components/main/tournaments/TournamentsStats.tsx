import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy } from 'lucide-react'

const stats = [
    { label: "Total Tournaments", value: "6" },
    { label: "Active Tournaments", value: "4" },
    { label: "Inactive Tournaments", value: "2" },
]

function TournamentsStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-1/2">
            {stats.map((item) => (
                <Card key={item.label} className="rounded-2xl border-2 bg-card px-2 py-4 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2 pb-2 h-full">
                        <CardContent className="p-0">
                            <CardTitle className="text-sm font-medium text-emerald-200/80">{item.label}</CardTitle>
                            <p className="mt-1 text-2xl font-bold tracking-tight text-white">{item.value}</p>
                        </CardContent>

                        <Trophy className="size-10 text-emerald-200" />

                    </CardHeader>

                </Card>
            ))
            }
        </div >
    )
}
export default TournamentsStats