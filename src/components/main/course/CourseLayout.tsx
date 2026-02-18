"use client"

import { useState } from "react"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import CourseStats from "./CourseStats"
import TopRatedCourses from "./TopRatedCourses"
import CourseTable from "./CourseTable"
import AddEditCourseModal, {
  type CourseFormValues,
  type CourseModalInitialData,
} from "./AddEditCourseModal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Course } from "./CourseTable"

function courseToInitialData(course: Course): CourseModalInitialData {
  return {
    id: course.id,
    name: course.name,
    location: course.location,
    pinLinks5: course.pinLinks5,
    mediaUrl: undefined,
  }
}

export default function CourseLayout() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const handleAddCourse = () => {
    setModalMode("add")
    setSelectedCourse(null)
    setModalOpen(true)
  }

  const handleEditCourse = (course: Course) => {
    setModalMode("edit")
    setSelectedCourse(course)
    setModalOpen(true)
  }

  const handleModalSubmit = (data: CourseFormValues) => {
    // TODO: call API to create/update course, then refetch list
    console.log("Course submit:", modalMode, data)
    setModalOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <SmallPageInfo
          title="Course Management"
          description="Manage golf courses and ratings"
        />
        <Button
          variant="outline"
          className="bg-[#1b4d3c] text-white hover:bg-[#1b4d3c]/90 hover:text-white gap-2"
          onClick={handleAddCourse}
        >
          <Plus /> Add Course
        </Button>
      </div>
      <CourseStats />
      <TopRatedCourses />
      <CourseTable onEditCourse={handleEditCourse} />
      <AddEditCourseModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        initialData={selectedCourse ? courseToInitialData(selectedCourse) : null}
        onSubmit={handleModalSubmit}
      />
    </div>
  )
}
