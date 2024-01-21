'use client';

import Image from 'next/image';
import React from 'react'

interface AvatarProps{
    src: string | null | undefined;
}

const Avatar:React.FC<AvatarProps> = ({
    src
}) => {
  return (
    <Image
        className='rounded-full'
        src={src || '/images/placeholder.jpg'}
        width={30}
        height={30}
        alt="Avatar"
    />
  )
}

export default Avatar