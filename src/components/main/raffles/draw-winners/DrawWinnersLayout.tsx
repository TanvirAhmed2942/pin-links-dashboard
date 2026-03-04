"use client"

import { useState } from "react"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DrawCard from "./DrawCards"
import DrawModal, { type DrawParticipant } from "./DrawModal"
import { cn } from "@/lib/utils"
import WinnerStats from "./WinnerStats"

const pendingDraws = [
    { id: "1", raffleName: "Premium Golf Club Set", entryFee: "$1.00", endDate: "2024-02-15", totalEntries: "≈ 500", eligibleEntries: 500 },
    { id: "2", raffleName: "Premium Golf Club Set", entryFee: "$1.00", endDate: "2024-02-15", totalEntries: "≈ 500", eligibleEntries: 500 },
    { id: "3", raffleName: "Premium Golf Club Set", entryFee: "$1.00", endDate: "2024-02-15", totalEntries: "≈ 500", eligibleEntries: 500 },
]

const completedDraws = [
    {
        entryFee: "$1.00",
        endDate: "2023-12-31",
        totalEntries: "150",
        drawnDate: "2024-01-02",
        winnerName: "John Smith",
        winnerEmail: "john.smith@example.com",
    },
    {
        entryFee: "$1.00",
        endDate: "2023-12-31",
        totalEntries: "150",
        drawnDate: "2024-01-02",
        winnerName: "John Smith",
        winnerEmail: "john.smith@example.com",
    },
    {
        entryFee: "$1.00",
        endDate: "2023-12-31",
        totalEntries: "150",
        drawnDate: "2024-01-02",
        winnerName: "John Smith",
        winnerEmail: "john.smith@example.com",
    },
]

function DrawWinnersLayout() {
    const [drawModalOpen, setDrawModalOpen] = useState(false)
    const [selectedDraw, setSelectedDraw] = useState<typeof pendingDraws[0] | null>(null)

    const handleDrawWinner = (draw: typeof pendingDraws[0]) => {
        setSelectedDraw(draw)
        setDrawModalOpen(true)
    }

    const handleConfirmWinner = (winner: DrawParticipant) => {
        console.log("Winner confirmed:", winner, "for draw", selectedDraw?.id)
        setDrawModalOpen(false)
        setSelectedDraw(null)
    }

    return (
        <div className="space-y-4">
            <SmallPageInfo
                title="Draw Winners"
                description="Draw winners and manage raffle results"
            />
            <WinnerStats />
            <Tabs defaultValue="pending" className="w-full">
                <TabsList
                    variant="default"
                    className="w-full justify-start rounded-none border-b border-emerald-800/50 bg-transparent p-0 gap-6 h-auto"
                >
                    <TabsTrigger
                        value="pending"
                        className={cn(
                            "rounded-none border-2 border-transparent bg-transparent px-0 pb-3 pt-3 text-zinc-400 hover:text-white",
                            "data-[state=active]:border-emerald-500 data-[state=active]:text-white data-[state=active]:font-semibold"
                        )}
                    >
                        Pending Draws ({pendingDraws.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="completed"
                        className={cn(
                            "rounded-none border-2 border-transparent bg-transparent px-0 pb-3 pt-3 text-zinc-400 hover:text-white",
                            "data-[state=active]:border-emerald-500 data-[state=active]:text-white data-[state=active]:font-semibold"
                        )}
                    >
                        Completed Draws ({completedDraws.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-4 space-y-4">
                    {pendingDraws.map((draw) => (
                        <DrawCard
                            key={draw.id}
                            entryFee={draw.entryFee}
                            endDate={draw.endDate}
                            totalEntries={draw.totalEntries}
                            status="pending"
                            onDrawWinner={() => handleDrawWinner(draw)}
                        />
                    ))}
                </TabsContent>

                <TabsContent value="completed" className="mt-4 space-y-4">
                    {completedDraws.map((draw, i) => (
                        <DrawCard
                            key={`completed-${i}`}
                            entryFee={draw.entryFee}
                            endDate={draw.endDate}
                            totalEntries={draw.totalEntries}
                            status="completed"
                            drawnDate={draw.drawnDate}
                            winnerName={draw.winnerName}
                            winnerEmail={draw.winnerEmail}
                        />
                    ))}
                </TabsContent>
            </Tabs>

            <DrawModal
                open={drawModalOpen}
                onOpenChange={setDrawModalOpen}
                raffleName={selectedDraw?.raffleName}
                eligibleEntries={selectedDraw?.eligibleEntries}
                onConfirmWinner={handleConfirmWinner}
            />
        </div>
    )
}

export default DrawWinnersLayout
