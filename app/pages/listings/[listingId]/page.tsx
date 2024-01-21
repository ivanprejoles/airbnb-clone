import getCurrentUser from '@/app/actions/getCurrentuser';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import getListingById from '@/app/actions/getListingById';
import getReservation from '@/app/actions/getReservation';
import ClientOnly from '@/app/components/ClientOnly';

interface IParams {
    listingId?: string;
}

const ListingPage = async (
    {params} : {params: IParams}
) => {

    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservation(params);

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    
  return (
    <ClientOnly>
        <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
        />
    </ClientOnly>
  )
}

export default ListingPage