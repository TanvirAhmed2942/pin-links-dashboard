"use client"

import { useState } from "react"
import { FilterSearch } from "@/components/common/filter"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import { Card } from "@/components/ui/card"
import UsersTable from "./UsersTable"

const subscriptionOptions = ["All Subscriptions", "Free", "Pro", "Enterprise"]
const statusOptions = ["All Status", "Active", "Inactive", "Pending"]

export function UsersLayout() {
    const [search, setSearch] = useState("")
    const [subscription, setSubscription] = useState("All Subscriptions")
    const [status, setStatus] = useState("All Status")

    return (
        <div className="space-y-4">
            <SmallPageInfo
                title="User Management"
                description="Manage and monitor all PinLinks users"
            />
            {/* <Card className="rounded-2xl border border-emerald-900/50 bg-emerald-950/30 p-4 shadow-none"> */}
            <FilterSearch
                search={{
                    placeholder: "Search by name, email, or ID...",
                    value: search,
                    onChange: setSearch,
                }}
                selects={[
                    {
                        placeholder: "All Subscriptions",
                        options: subscriptionOptions,
                        value: subscription,
                        onValueChange: setSubscription,
                        width: "lg",
                    },
                    {
                        placeholder: "All Status",
                        options: statusOptions,
                        value: status,
                        onValueChange: setStatus,
                        width: "md",
                    },
                ]}
            />
            <UsersTable />
            {/* </Card> */}
        </div>
    )
}
