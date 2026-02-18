import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import MontlyRevenuePlan from "./MontlyRevenuePlan"
import PlanStats from "./PlanStats"
import PlansTable from "./PlansTable"

function PlanLayout() {
    return (
        <div className="space-y-4">
            <SmallPageInfo
                title="Subscription Plans"
                description="Manage and monitor all subscription plans"
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-3">
                    <MontlyRevenuePlan />
                </div>
                <div className="col-span-1">
                    <PlanStats />
                </div>
            </div>
            <PlansTable />
        </div>
    )
}

export default PlanLayout