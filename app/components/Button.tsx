'use client'

import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
    label: string;

    disabled?: boolean;
    outline?: boolean;
    small?: boolean;

    icon?: IconType;

    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
    label,

    disabled,
    outline,
    small,

    icon: Icon,

    onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-wait
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'p-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {
        Icon && (
          <Icon 
            size={24}
            className='
              absolute
              left
              top-3
            '
          />
        )
      }
      {label}
    </button>
  )
}

export default Button