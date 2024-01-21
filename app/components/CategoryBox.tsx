'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons';
import qs from 'query-string';

interface CategoryBoxProps {
    label: string;
    icon: IconType;
    selected: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    icon: Icon,
    selected,
}) => {

    const Params = useSearchParams();
    const Router = useRouter();

    const handleClick = useCallback(() => {
        let currentQuery = {}

        if (Params) {
            currentQuery = qs.parse(Params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        if (Params?.get('category') === label) {
            delete updatedQuery.category
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, {skipNull: true})

        Router.push(url)
    }, [label, Params, Router])
    
  return (
    <div
        onClick={handleClick}
        className={
            `
                flex
                flex-col
                items-center
                justify-center
                gap-2
                p-2
                border-b-2
                hover:text-neutral-800
                transition
                cursor-pointer
                ${selected ? 'border-neutral-800' : 'border-transparent'}   
                ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `
        }
    >
        <Icon size={26}/>
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  )
}

export default CategoryBox