import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


function EmployeeStats() {
    const stats = [
        { label: "Total Employees", value: "100" },
        { label: "Super Admin", value: "80" },
        { label: "Active Employees", value: "20" },
        { label: "Inactive Employees", value: "20" },
        { label: "Role", value: "5" },
    ]
    return (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {stats.map((stat) => (
                <Card key={stat.label} className="rounded-2xl border-2 bg-card px-2 py-4 shadow-none">
                    <CardHeader>
                        <CardTitle className="text-sm text-sidebar-foreground">{stat.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold tracking-tight text-white">{stat.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default EmployeeStats