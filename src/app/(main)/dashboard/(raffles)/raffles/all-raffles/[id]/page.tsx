import ViewRaffleLayout from "@/components/main/raffles/all-raffles/view-raffle/ViewRaffleLayout";


async function ViewRafflePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <ViewRaffleLayout raffleId={id} />
    )
}

export default ViewRafflePage; 