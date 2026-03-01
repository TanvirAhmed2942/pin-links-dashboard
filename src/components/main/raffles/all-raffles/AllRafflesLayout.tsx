"use client"

import React, { useState } from "react"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AllRafflesStat from "./AllRafflesStat"
import RaffleCard from "./RaffleCard"
import AddEditRaffleModal, {
    type RaffleFormValues,
    type RaffleModalInitialData,
    type EligibilityOption,
} from "./AddEditRaffleModal"
import { FilterSearch } from "@/components/common/filter"
import type { RaffleStatus } from "./RaffleCard"
import { useRouter } from "next/navigation"

type RaffleItem = {
    id: string
    title: string
    startDate: string
    endDate: string
    price: string
    entries: number
    maxEntries: number
    status: RaffleStatus
    accessType: string
}

const sampleRaffles: RaffleItem[] = [
    { id: "1", title: "Premium Golf Club", startDate: "2024-02-01", endDate: "2024-03-15", price: "$1.00", entries: 387, maxEntries: 500, status: "active", accessType: "Club Only" },
    { id: "2", title: "Premium Golf Club", startDate: "2024-02-01", endDate: "2024-03-15", price: "$1.00", entries: 500, maxEntries: 500, status: "ended", accessType: "Club Only" },
    { id: "3", title: "Premium Golf Club", startDate: "2024-02-01", endDate: "2024-03-15", price: "$1.00", entries: 387, maxEntries: 500, status: "drawn", accessType: "Club Only" },
    { id: "4", title: "Premium Golf Club", startDate: "2024-02-01", endDate: "2024-03-15", price: "$1.00", entries: 0, maxEntries: 500, status: "draft", accessType: "Club Only" },
]

function raffleToModalData(r: RaffleItem): RaffleModalInitialData {
    const eligibilityFromAccess: EligibilityOption =
        r.accessType === "Club Only" ? "club" : r.accessType === "Creator / Business" ? "creator" : "free"
    return {
        id: r.id,
        title: r.title,
        startDate: r.startDate,
        endDate: r.endDate,
        entryFee: r.price.replace(/^\$/, ""),
        maxEntries: r.maxEntries,
        eligibility: eligibilityFromAccess,
        publicationStatus: r.status === "draft" ? "draft" : "active",
    }
}

function AllRafflesLayout() {
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("All Status")
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<"add" | "edit">("add")
    const [selectedRaffle, setSelectedRaffle] = useState<RaffleItem | null>(null)
    const router = useRouter()
    const handleCreateRaffle = () => {
        setModalMode("add")
        setSelectedRaffle(null)
        setModalOpen(true)
    }

    const handleEditRaffle = (raffle: RaffleItem) => {
        setModalMode("edit")
        setSelectedRaffle(raffle)
        setModalOpen(true)
    }

    const handleModalSubmit = (data: RaffleFormValues) => {
        // TODO: call API to create/update raffle
        console.log(modalMode, data)
        setModalOpen(false)
    }

    const handleViewRaffle = (raffle: RaffleItem) => {
        router.push(`/dashboard/raffles/all-raffles/${raffle.id}`)
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <SmallPageInfo
                    title="Raffle Management"
                    description="Create and manage platform raffles and prizes"
                />
                <Button
                    variant="outline"
                    className="bg-[#1b4d3c] text-white hover:bg-[#1b4d3c]/90 hover:text-white gap-2"
                    onClick={handleCreateRaffle}
                >
                    <Plus className="w-4 h-4" />
                    Create New Raffle
                </Button>
            </div>
            <AllRafflesStat />
            <FilterSearch
                search={{
                    placeholder: "Search by raffle name, description, or ID...",
                    value: search,
                    onChange: setSearch,
                }}
                selects={[
                    {
                        placeholder: "All Status",
                        options: ["All Status", "Active", "Ended", "Drawn", "Draft"],
                        value: status,
                        onValueChange: setStatus,
                        width: "md",
                    },
                ]}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleRaffles.map((r) => (
                    <RaffleCard
                        key={r.id}
                        title={r.title}
                        startDate={r.startDate}
                        endDate={r.endDate}
                        price={r.price}
                        entries={r.entries}
                        maxEntries={r.maxEntries}
                        status={r.status}
                        accessType={r.accessType}
                        onView={() => handleViewRaffle(r)}
                        onEdit={() => handleEditRaffle(r)}
                        onDrawWinner={r.status === "ended" ? () => { } : undefined}
                        onDelete={r.status === "draft" ? () => { } : undefined}
                    />
                ))}
            </div>
            <AddEditRaffleModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                mode={modalMode}
                initialData={selectedRaffle ? raffleToModalData(selectedRaffle) : null}
                onSubmit={handleModalSubmit}
            />
        </div>
    )
}

export default AllRafflesLayout
