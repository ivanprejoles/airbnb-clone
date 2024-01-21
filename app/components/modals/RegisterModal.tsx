'use client'

import {useForm, SubmitHandler, FieldValues} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/UseRegisterModal'
import React, { useCallback, useState } from 'react'
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import useLoginModal from '@/app/hooks/UseLoginModal';
import toast from 'react-hot-toast';


const RegisterModal = () => {

  const RegisterModal = useRegisterModal();
  const LoginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const toggle = useCallback(() => {
    RegisterModal.onClose()
    LoginModal.onOpen();
  }, [RegisterModal, LoginModal]);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        RegisterModal.onClose();
        toast.success('Account Registered')
        LoginModal.onClose();    
      })
      .catch((error) => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false);
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
        id='name'
        label='Name'

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
        label='Continue with Google'

        outline

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
          flex flex-row items-center gap-2 justify-center
        "
      >
        <div>Already have an account?</div>
        <div 
          onClick={toggle}
          className="
            text-neutral-800
            cursor-pointer
            hover:underline
          "
        >
          Login
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      title='Register'
      actionLabel='Continue'

      body={bodyContent}
      footer={footerContent}

      disabled={isLoading}
      isOpen={RegisterModal.isOpen}

      onSubmit={handleSubmit(onSubmit)}
      onClose={RegisterModal.onClose}
    />
  )
}

export default RegisterModal