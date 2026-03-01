"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import { Button } from "@/components/ui/button"
import { FilterSearch } from "@/components/common/filter"
import RaffleCategoryCard from "./RaffleCategoryCard"
import CategoryAddEditModal, {
  type CategoryFormValues,
  type CategoryModalInitialData,
} from "./CategoryAddEditModal"

export type RaffleCategoryItem = {
    id: number | string
    name: string
    description?: string
    image: string
}

const sampleCategories: RaffleCategoryItem[] = [
    {
        id: 1,
        name: "Driver",
        description: "Golf drivers",
        image: "/raffle/golf_bat.jpg",
    },
    {
        id: 2,
        name: "Category 2",
        description: "Description 2",
        image: "/raffle/golf_bat_2.jpg",
    },
]

function categoryToModalData(c: RaffleCategoryItem): CategoryModalInitialData {
  return {
    id: c.id,
    name: c.name,
    description: c.description,
    image: c.image,
  }
}

function RaffleCatogoriesLayout() {
    const [search, setSearch] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState<"add" | "edit">("add")
    const [selectedCategory, setSelectedCategory] = useState<RaffleCategoryItem | null>(null)

    const handleAddCategory = () => {
        setModalMode("add")
        setSelectedCategory(null)
        setModalOpen(true)
    }

    const handleEdit = (id: number | string) => {
        const category = sampleCategories.find((c) => c.id === id) ?? null
        setModalMode("edit")
        setSelectedCategory(category)
        setModalOpen(true)
    }

    const handleModalSubmit = (data: CategoryFormValues) => {
        // TODO: call API to create/update category (data.name, data.description, data.image)
        console.log(modalMode, data)
        setModalOpen(false)
    }

    const handleDelete = (id: number | string) => {
        // TODO: confirm and delete
        console.log("Delete category", id)
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <SmallPageInfo
                    title="Raffle Categories"
                    description="Manage the categories of raffles"
                />
                <Button
                    variant="outline"
                    className="bg-[#1b4d3c] text-white hover:bg-[#1b4d3c]/90 hover:text-white gap-2"
                    onClick={handleAddCategory}
                >
                    <Plus className="w-4 h-4" />
                    Add New Category
                </Button>
            </div>
            <FilterSearch
                search={{
                    placeholder: "Search by category name",
                    value: search,
                    onChange: setSearch,
                }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {sampleCategories.map((category) => (
                    <RaffleCategoryCard
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        image={category.image}
                        description={category.description}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <CategoryAddEditModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                mode={modalMode}
                initialData={selectedCategory ? categoryToModalData(selectedCategory) : null}
                onSubmit={handleModalSubmit}
            />
        </div>
    )
}

export default RaffleCatogoriesLayout
