import getCurrentUser from '@/app/actions/getCurrentuser';
import getFavoriteListings from '@/app/actions/getFavoriteListings'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
    
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No favorites found'
                    subtitle='Looks like your have no favorite listings1'
                />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default FavoritesPage