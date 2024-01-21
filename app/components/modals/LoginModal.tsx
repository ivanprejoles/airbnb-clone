'use client'

import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';

import useLoginModal from '@/app/hooks/UseLoginModal'
import React, { useCallback, useState } from 'react'
import Heading from '../Heading';
import Input from '../inputs/Input';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Modal from './Modal';
import useRegisterModal from '@/app/hooks/UseRegisterModal';

const LoginModal = () => {

  const [isLoading, setIsLoading] = useState(false);

  const Router = useRouter();
  const LoginModal = useLoginModal();
  const RegisterModal = useRegisterModal();

  const toggle = useCallback(() => {
    LoginModal.onClose()
    RegisterModal.onOpen()
  }, [LoginModal, RegisterModal])
  
  const {
    handleSubmit,
    register,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        LoginModal.onClose();
        Router.refresh();
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title='Welcome to Ivanhouse'
        subtitle='Create an account!'
      />
      <Input
        id='email'
        label='Email'
        type='email'

        disabled={isLoading}
        required

        register={register}
        errors={errors}
      />
      <Input
        id='password'
        label='Password'
        type='password'

        disabled={isLoading}
        required

        register={register}
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
          outline
          label='Continue with Google'
          icon={FcGoogle}
          onClick={() => signIn('google')}
      />
      <Button 
          label='Continue with Github'

          outline
          
          icon={AiFillGithub}
          
          onClick={() => signIn('github')}
      />
      <div 
          className="
              text-neutral-500
              text-center
              mt-4
              font-light
          "
      >
          <div className='flex flex-row items-center gap-2 justify-center'>
              <div>
                  First time using Airbnb?
              </div>
              <div 
                  onClick={toggle}
                  className='
                      text-neutral-800
                      cursor-pointer
                      hover:underline
                  '
              >
                  Create an account
              </div>
          </div>
      </div>
    </div>
  )

  
  return (
    <Modal
      title='Login'
      actionLabel='Continue'

      isOpen={LoginModal.isOpen}
      disabled={isLoading}

      onClose={LoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}

      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal