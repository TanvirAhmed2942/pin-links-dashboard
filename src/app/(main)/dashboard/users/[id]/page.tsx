import UserDeatilsLayout from "@/components/main/users-details/UserDeatilsLayout"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function UserDetailsPage({ params }: PageProps) {
  const { id } = await params
  return <UserDeatilsLayout userId={id} />
}
