"use client"

import { Mail, Phone, MapPin, Calendar, FileUser } from "lucide-react"
import DetailCard from "./DetailCard"

type PersonalInformationCardProps = {
  email: string
  phone: string
  location: string
  joinedDate: string
}

export default function PersonalInformationCard({
  email,
  phone,
  location,
  joinedDate,
}: PersonalInformationCardProps) {
  const rows = [
    { icon: Mail, label: "Email", value: email },
    { icon: Phone, label: "Phone", value: phone },
    { icon: MapPin, label: "Location", value: location },
    { icon: Calendar, label: "Joined Date", value: `Joined ${joinedDate}` },
  ]

  return (
    <DetailCard title="Personal Information" icon={<FileUser className="size-5 text-sidebar-foreground" />}>
      <ul className="space-y-3">
        {rows.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex items-center gap-3 text-sm">
            <Icon className="size-4 shrink-0 text-zinc-400" />
            <span className="text-zinc-400">{label}:</span>
            <span className="text-zinc-200">{value}</span>
          </li>
        ))}
      </ul>
    </DetailCard>
  )
}

