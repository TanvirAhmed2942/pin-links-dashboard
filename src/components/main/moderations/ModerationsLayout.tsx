"use client"
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import ModerationStats from './ModerationStats'
import ContentModerationTrends from './ContentModerationTrends'
import PostTable from './PostTable'
import { FilterSearch } from '@/components/common/filter'
import { useState } from 'react'

function ModerationsLayout() {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("All Status")
    return (
        <div className="space-y-4">
            <SmallPageInfo
                title="Posts Moderation"
                description="Review and moderate user-generated content"
            />
            <ModerationStats />
            <ContentModerationTrends />
            <FilterSearch
                search={{
                    placeholder: "Search by post ID, user, or content...",
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
            <PostTable />
        </div>
    )
}

export default ModerationsLayout