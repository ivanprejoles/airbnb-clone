import getCurrentUser from '@/app/actions/getCurrentuser'
import getListings from '@/app/actions/getListings';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No properties found'
                    subtitle='Looks like you have no properties'
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title='No properties found'
                    subtitle='Looks liike you have no properties'
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default PropertiesPage