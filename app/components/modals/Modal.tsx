'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../Button';

interface ModalProps {
  title?: string;
  actionLabel: string;
  secondaryActionLabel?: string;

  body?: React.ReactElement;
  footer?: React.ReactElement;

  isOpen?: boolean;
  disabled?: boolean;
  
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;

}

const Modal: React.FC<ModalProps> = ({
  title,
  actionLabel,
  secondaryActionLabel,

  body,
  footer,

  isOpen,
  disabled,

  onClose,
  onSubmit,
  secondaryAction
}) => {

  // IDEA
  // this modal is a center of all modals that can be used as the container of other modals, it also has animation thats in the onclose with transition time of 3ms

  //open state of modal
  const [showModal, setShowModal] = useState(isOpen);

  //monitoring show state
  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])
  
  // handling close event with animation as settimeout
  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose])

  // handling submit event
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }
    onSubmit()
  }, [disabled, onSubmit])

  // handling secondary event if existing
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction])

  // if modal is open
  if (!isOpen) {
    return null
  }

  return (
    <>
      <div
        className='
          justify-center
          items-center
          flex
          overflow-x-hidden
          overflow-y-hidden
          fixed
          inset-0
          z-50
          outline-none
          focus:outline-none
          bg-neutral-800/70
        '
      >
        <div 
          className="
            relative
            w-full
            md:w-4/6
            lg:w-3/4
            xl:w-2/5
            my-6
            mx-auto
            h-full
            lg:h-auto
            md:h-auto
          "
        >
          {/* CONTENT */}
          {/* ANIMATION */}
          <div 
            className={`
              translate
              duration-300
              h-full
              ${showModal ? 'translate-y-0' : 'translate-y-full'}
              ${showModal ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <div 
              className="
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-0
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-white
                outline-none
                focus:outline-none
              "
            >
              {/* HEADER */}
              <div 
                className="
                  flex
                  items-center
                  p-6
                  rounded-t
                  justify-center
                  border-b-[1px]
                "
              >
                <button 
                  onClick={handleClose}
                  className="
                    p-1
                    border-0
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              {/* BODY */}
              <div 
                className="
                  relative
                  p-6
                  flex-auto
                "
              >
                {body}
              </div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div 
                  className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                    label={secondaryActionLabel}

                    disabled={disabled}
                    outline

                    onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    label={actionLabel}

                    disabled={disabled}

                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal