"use client"
import React, { useState } from 'react'
import TournamentsStats from './TournamentsStats'
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import { FilterSearch } from '@/components/common/filter'
import TournamentsTable from './TournamentsTable'

function TournamentsLayout() {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("All Status")
    return (
        <div className="space-y-4">
            <SmallPageInfo
                title="Tournament Management"
                description="Monitor and manage all tournaments"
            />
            <TournamentsStats />
            <FilterSearch
                search={{
                    placeholder: "Search by name, creator, or ID...",
                    value: search,
                    onChange: setSearch,
                }}
                selects={[
                    {
                        placeholder: "All Status",
                        options: ["All Status", "Active", "Inactive", "Pending"],
                        value: status,
                        onValueChange: setStatus,
                        width: "md",
                    },
                ]}
                className="rounded-2xl border-emerald-900/60 bg-emerald-950/50"
            />
            <TournamentsTable />
        </div>
    )
}

export default TournamentsLayout