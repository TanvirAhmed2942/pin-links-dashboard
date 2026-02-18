"use client"

import { useState } from "react"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import { FilterSearch } from "@/components/common/filter"
import TransactionStats from "./TransactionStats"
import RevenueAnalysis from "./RevenueAnalysis"
import TransactionTable from "./TransactionTable"

const statusOptions = ["All Status", "Completed", "Pending", "Failed"]

function TransactionLayout() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All Status")

  return (
    <div className="space-y-4">
      <SmallPageInfo
        title="Transactions"
        description="Monitor all payment transactions and billing history"
      />
      <TransactionStats />
      <RevenueAnalysis />

      <FilterSearch
        search={{
          placeholder: "Search by transaction ID, user, or email...",
          value: search,
          onChange: setSearch,
        }}
        selects={[
          {
            placeholder: "All Status",
            options: statusOptions,
            value: status,
            onValueChange: setStatus,
            width: "md",
          },
        ]}
        className="rounded-2xl border-emerald-900/60 bg-emerald-950/50"
      />
      <TransactionTable />
    </div>
  )
}

export default TransactionLayout
