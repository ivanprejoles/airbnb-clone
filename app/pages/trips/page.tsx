

import getCurrentUser from '@/app/actions/getCurrentuser'
import getReservation from '@/app/actions/getReservation';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import TripsClient from './TripsClient';
import Container from '@/app/components/Container';
import ClientOnly from '@/app/components/ClientOnly';

const TripsPage = async () => {

    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title='Unauthorized'
                    subtitle='Please login'
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservation({
        userId: currentUser.id,
    })

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No trips found'
                    subtitle="Looks like you haven't reserved any trips"
                />
            </ClientOnly>
        )
    }
    
  return (
    <ClientOnly>
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default TripsPage