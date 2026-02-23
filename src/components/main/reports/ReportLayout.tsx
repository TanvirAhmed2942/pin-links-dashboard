"use client"
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import ReportStat from './ReportStat'
import { FilterSearch } from '@/components/common/filter'
import { useState } from 'react'
import ReportsTable from './ReportsTable'

function ReportLayout() {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("All Status")
    const [priority, setPriority] = useState("All Priority")
    return (
        <div className="space-y-4">
            <SmallPageInfo
                title="Reports"
                description="View and analyze all reports"
            />
            <ReportStat />
            <FilterSearch
                search={{
                    placeholder: "Search by report ID, user, or content...",
                    value: search,
                    onChange: setSearch,
                }}
                selects={[
                    {
                        placeholder: "All Status",
                        options: ["All Status", "Open", "In Progress", "Closed"],
                        value: status,
                        onValueChange: setStatus,
                        width: "md",
                    },
                    {
                        placeholder: "All Priority",
                        options: ["All Priority", "High", "Medium", "Low"],
                        value: priority,
                        onValueChange: setPriority,
                        width: "sm",
                    },
                ]}
                className="rounded-2xl border-emerald-900/60 bg-emerald-950/50"
            />
            <ReportsTable />
        </div>
    )
}

export default ReportLayout