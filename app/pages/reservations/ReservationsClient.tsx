'use client'

import Container from '@/app/components/Container'
import Heading from '@/app/components/Heading'
import ListingCard from '@/app/components/listings/ListingCard'
import { SafeReservations, SafeUser } from '@/app/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

interface ReservationsClientProps {
    currentUser?: SafeUser | null,
    reservations: SafeReservations[]
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    currentUser,
    reservations
}) => {

    const Router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/reservations/${deletingId}`)
        .then(() => {
            toast.success('Reservation cancelled')
        })
        .catch((error) => {
            toast.error(error.message)
        })
        .finally(() => {
            setDeletingId('')
        })
    }, [Router])
    
  return (
    <Container>
        <Heading
            title='Reservations'
            subtitle='Bookings on your properties'
        />
        <div 
            className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
        >
            {
                reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))
            }
        </div>
    </Container>
  )
}

export default ReservationsClient