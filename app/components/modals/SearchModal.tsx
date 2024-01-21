'use client';

import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import Heading from '../Heading';
import CountrySelect, { countrySelectValue } from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import useSearchModal from '@/app/hooks/useSearchModal';
import { Range } from 'react-date-range';
import queryString from 'query-string';
import { formatISO } from 'date-fns';
import Calendar from '../inputs/Calendar';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

const SearchModal = () => {

    const SearchModal = useSearchModal()
    const Router = useRouter()
    const Params = useSearchParams()
    
    const [location, setLocation] = useState<countrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION);
    const [dateRange, setDateRange] = useState<Range>({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    })
  
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
  
    const Map = useMemo(() => dynamic(() => import('../Map'), {
      ssr: false
    }), [location])

    const onBack = useCallback(() => {
        setStep((value) => value -1)
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value +1)
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext()
        }

        let currentQuery = {}

        if (Params) {
            currentQuery = queryString.parse(Params.toString())
        }
        const updateQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange.startDate) {
            updateQuery.startDate = formatISO(dateRange.startDate)
        }

        if (dateRange.endDate) {
            updateQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = queryString.stringifyUrl({
            url: '/',
            query: updateQuery
        }, {skipNull: true})

        setStep(STEPS.LOCATION)
        SearchModal.onClose()
        Router.push(url)

    }, [step, Params, location, guestCount, roomCount, bathroomCount, dateRange, SearchModal, Router, onNext])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title='Where do you wanna go?'
            subtitle='Find the perfect location!'
          />
          <CountrySelect
            value={location}
            onChange={(value) => setLocation(value as countrySelectValue)}
          />
          <hr />
          <Map center={location?.latLng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='When do you plan to go'
                    subtitle='Make sure everyone is free!'
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title='More Information'
                    subtitle='Find your perfect place!'
                />
                <Counter
                    title='Guests'
                    subtitle='How many guests are coming?'
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms do you need?'
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you need?'
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }
  
  return (
    <Modal
    title='Filters'
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}

    isOpen={SearchModal.isOpen}

    
    onSubmit={onSubmit}
    secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    onClose={SearchModal.onClose}
    
    body={bodyContent}
    />
  )
}

export default SearchModal