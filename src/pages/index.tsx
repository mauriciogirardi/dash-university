import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Flex, Stack, useToast } from '@chakra-ui/react'
import { RiLockLine, RiMailLine } from 'react-icons/ri'
import Image from 'next/image'
import Head from 'next/head'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Form/Input'
import logoSvg from '../assets/logo.svg'
import { useState } from 'react'
import { useRouter } from 'next/router'

type SignInFormData =
  | {
      email: string
      password: string
    }
  | FieldValues

const signInFromSchema = yup.object({
  email: yup
    .string()
    .email('E-mail está no formato incorreto')
    .required('Campo e-mail é obrigatório'),
  password: yup.string().required('Campo senha é obrigatório'),
})

export default function Home() {
  const toast = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(signInFromSchema),
  })

  const handleSignIn: SubmitHandler<SignInFormData> = (data) => {
    try {
      console.log('TODO LOGIN', data)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Login',
        description: 'Houve um error ao fazer o login, tente novamente!',
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxW={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Flex w="100%" mb="8" justify="center">
            <Image alt="dash university" src={logoSvg} width={200} />
          </Flex>
          <Stack spacing={4}>
            <Input
              htmlFor="email"
              type="email"
              placeholder="E-mail"
              icon={RiMailLine}
              error={errors.email}
              {...register('email')}
            />
            <Input
              htmlFor="password"
              type="password"
              placeholder="Senha"
              icon={RiLockLine}
              error={errors.password}
              {...register('password')}
            />
          </Stack>
          <Button
            isLoading={isSubmitting}
            type="submit"
            mt="6"
            colorScheme="green"
            size="lg"
            onClick={() => router.push('/dashboard')}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  )
}
