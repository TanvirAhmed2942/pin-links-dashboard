import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy } from 'lucide-react'

const stats = [
    { label: "Total Posts", value: "6" },
    { label: "Pending Posts", value: "4" },
    { label: "Approved Posts", value: "2" },
]

function ModerationStats() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-1/2">
            {stats.map((item) => (
                <Card key={item.label} className="rounded-2xl border-2 bg-card p-4 shadow-none">

                    <CardContent className="p-0">
                        <CardTitle className="text-sm font-medium text-emerald-200/80">{item.label}</CardTitle>
                        <p className="mt-1 text-2xl font-bold tracking-tight text-white">{item.value}</p>
                    </CardContent>

                </Card>
            ))
            }
        </div >
    )
}

export default ModerationStats