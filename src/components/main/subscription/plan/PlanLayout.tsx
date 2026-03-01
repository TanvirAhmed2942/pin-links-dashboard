"use client"

import { useState } from "react"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import MontlyRevenuePlan from "./MontlyRevenuePlan"
import PlanStats from "./PlanStats"
import PlansTable from "./PlansTable"
import AddPlanSheet, { type AddPlanFormData } from "./AddPlanSheet"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function PlanLayout() {
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleSubmit = (data: AddPlanFormData) => {
    // TODO: call API to create plan
    console.log("Add plan:", data)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SmallPageInfo
          title="Subscription Plans"
          description="Manage and monitor all subscription plans"
        />
        <Button
          variant="outline"
          className="bg-[#1b4d3c] text-white hover:bg-[#1b4d3c]/90 hover:text-white gap-2"
          onClick={() => setSheetOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Plan
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-3">
          <MontlyRevenuePlan />
        </div>
        <div className="col-span-1">
          <PlanStats />
        </div>
      </div>
      <PlansTable />
      <AddPlanSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
