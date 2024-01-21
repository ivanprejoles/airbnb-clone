'use client';

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { categories } from '@/app/components/navigation/Categories';
import useLoginModal from '@/app/hooks/UseLoginModal';
import { SafeListing, SafeReservations, SafeUser } from '@/app/types';
import axios from 'axios';
import { eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps {
    listing: SafeListing & {
      user: SafeUser
    };
    currentUser?: SafeUser | null;
    reservations?: SafeReservations[]
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const LoginModal = useLoginModal();
  const Router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })
      dates = [...dates, ...range];
    })
    
    return dates;
  }, [reservations])

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return LoginModal.onOpen()
    }
    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
    .then(() => {
      toast.success('Listing Reserved!')
      setDateRange(initialDateRange);
      Router.push('/pages/trips')
    })
    .catch((error) => {
      toast.error(error.message)
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [
    LoginModal,
    Router ,
    currentUser,
    dateRange,
    listing?.id,
    totalPrice
  ])
  
  const category = useMemo(() => {
    return categories.find((item) =>
    item.label === listing.category)  
  }, [listing.category]) 
  
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div 
            className="
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
              my-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div 
                className="
                  order-first
                  mb-10
                  md:order-last
                  md:col-span-3
                "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient