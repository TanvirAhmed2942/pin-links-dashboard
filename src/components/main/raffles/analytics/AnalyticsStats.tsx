
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, Clock, Trophy } from 'lucide-react'

function AnalyticsStats() {
    const stats = [
        { label: "Total Revenue", value: "100", icon: Clock, bg: "bg-green-900/50" },
        { label: "Total Entries", value: "100", icon: Trophy, bg: "bg-emerald-500" },
        { label: "Entries per Raffle", value: "100", icon: Award, bg: "bg-blue-500" },


    ]
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-white flex items-center gap-4">
                                <stat.icon className={`size-15 ${stat.bg} rounded-lg p-2`} />
                                {stat.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold tracking-tight text-white">{stat.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default AnalyticsStats;