import getCurrentUser from "@/app/actions/getCurrentuser"
import getReservation from "@/app/actions/getReservation"
import ClientOnly from "@/app/components/ClientOnly"
import EmptyState from "@/app/components/EmptyState"
import ReservationsClient from "./ReservationsClient"

const ReservationsPage = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please Login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservation({authorId: currentUser.id});

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="Looks like you have no reservations on your properties"
                />
            </ClientOnly>
        )
    }
    
  return (
    <ClientOnly>
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default ReservationsPage