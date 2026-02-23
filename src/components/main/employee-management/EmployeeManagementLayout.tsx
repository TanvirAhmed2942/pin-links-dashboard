"use client"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import EmployeeStats from "./EmployeeStats"
import EmployeeTable from "./EmployeeTable"
import AddEditEmployeeModal, {
    type EmployeeFormValues,
    type EmployeeModalInitialData,
} from "./AddEditEmployeeModal"
import { FilterSearch } from "@/components/common/filter"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Shield } from "lucide-react"
import type { Employee } from "./EmployeeTable"
import { useRouter } from "next/navigation"

function employeeToInitialData(employee: Employee): EmployeeModalInitialData {
    return {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        permissionLevel: employee.permissionLevel,
        assignedModules: employee.assignedModules,
        status: employee.status,
    }
}

function EmployeeManagementLayout() {
    const [search, setSearch] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<"add" | "edit">("add")
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const router = useRouter()
    const handleAddEmployee = () => {
        setModalMode("add")
        setSelectedEmployee(null)
        setModalOpen(true)
    }

    const handleEditEmployee = (employee: Employee) => {
        setModalMode("edit")
        setSelectedEmployee(employee)
        setModalOpen(true)
    }

    const handleModalSubmit = (data: EmployeeFormValues) => {
        // TODO: call API to create/update employee
        console.log("Employee submit:", modalMode, data)
        setModalOpen(false)
    }

    const handleManagePermissions = () => {
        router.push("/dashboard/role-wise-persmissions")
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <SmallPageInfo
                    title="Employee Management"
                    description="Manage and monitor all employees"
                />
                <div className="flex items-center flex-row-reverse gap-4">
                    <Button
                        variant="outline"
                        className="bg-[#1b4d3c] text-white hover:bg-[#1b4d3c]/90 hover:text-white gap-2"
                        onClick={handleAddEmployee}
                    >
                        <Plus /> Add Employee
                    </Button>
                    <Button variant="outline" className="bg-[#1b4d3c] text-white hover:bg-[#1b4d3c]/90 hover:text-white gap-2" onClick={handleManagePermissions}>
                        <Shield /> Manage Permissions
                    </Button>
                </div>
            </div>

            <EmployeeStats />
            <FilterSearch
                search={{
                    placeholder: "Search by name, email, or role...",
                    value: search,
                    onChange: setSearch,
                }}
                className="rounded-2xl border-emerald-900/60 bg-emerald-950/50"
            />
            <EmployeeTable onEditEmployee={handleEditEmployee} />
            <AddEditEmployeeModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                mode={modalMode}
                initialData={selectedEmployee ? employeeToInitialData(selectedEmployee) : null}
                onSubmit={handleModalSubmit}
            />
        </div>
    )
}

export default EmployeeManagementLayout