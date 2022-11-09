import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { SimpleGrid, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import * as yup from 'yup'

import { optionsLevelUser, optionsStatus } from './utils'
import { queryClient } from '../../services/queryClient'
import { FormLayout } from '../../layout/FormLayout'
import { Select } from '../../components/Form/Select'
import { Input } from '../../components/Form/Input'
import { User } from '../../types/User'
import { api } from '../../services/axios'

type CreateUserFormData =
  | {
      email: string
      password: string
      name: string
      level: string
      status: string
    }
  | FieldValues

type EditUserFormData = {
  userId: string
  data: CreateUserFormData
}

const createUserFormSchema = yup.object({
  email: yup
    .string()
    .email('E-mail está no formato incorreto')
    .required('Campo e-mail é obrigatório'),
  name: yup.string().required('Campo nome é obrigatório'),
  status: yup.string().required('Campo status da conta é obrigatório'),
  level: yup.string().required('Campo nome é obrigatório'),
  password: yup
    .string()
    .required('Campo senha é obrigatório')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisão ser iguais')
    .required('Campo confirmação de senha é obrigatório'),
})

export default function CreateUsers() {
  const [userDataEdit, setUserDataEdit] = useState<User>()
  const route = useRouter()
  const toast = useToast()
  const { id } = route.query as { id: string }
  const userId = id ? String(id) : false

  const fetchUser = async () => {
    try {
      const { data } = await api.get(`/users/${userId}`)
      setUserDataEdit(data.user)
    } catch (err) {
      console.error(err)
    }
  }

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      await api.post('/users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )

  const editUser = useMutation(
    async ({ data, userId }: EditUserFormData) => {
      await api.put<EditUserFormData>(`/users/${userId}`, {
        user: {
          email: data.email,
          level: data.level,
          name: data.name,
          password: data.password,
          status: data.status,
          created_at: new Date(),
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    try {
      userId
        ? await editUser.mutateAsync({ userId, data })
        : await createUser.mutateAsync(data)

      toast({
        title: 'Usuário',
        description: `Usuário ${
          userId ? 'editado' : 'cadastrado'
        } com sucesso!`,
        status: 'success',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
      reset()
      route.push('/users')
    } catch (err) {
      console.error(err)
      toast({
        title: 'Usuário',
        description: `Houve um error ao ${
          userId ? 'editar' : 'criar'
        } usuário, tente novamente!`,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    if (userDataEdit?.id) {
      setValue('name', userDataEdit.name)
      setValue('email', userDataEdit.email)
      setValue('level', userDataEdit.level)
      setValue('password', userDataEdit.password)
      setValue('password_confirmation', userDataEdit.password)
      setValue('status', userDataEdit.status)
    }
  }, [userDataEdit])

  useEffect(() => {
    if (userId) {
      fetchUser()
    }
  }, [])

  return (
    <FormLayout
      key="user"
      title={userId ? 'Editar usuário' : 'Criar usuário'}
      onSubmit={handleSubmit(handleCreateUser)}
      isSubmitting={isSubmitting}
      disabledSaveButton={!isDirty}
    >
      <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
        <Input
          htmlFor="name"
          label="Nome completo"
          {...register('name')}
          error={errors.name}
        />
        <Input
          htmlFor="email"
          type="email"
          label="E-mail"
          {...register('email')}
          error={errors.email}
        />
      </SimpleGrid>
      <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
        <Select
          htmlFor="status"
          options={optionsStatus}
          label="Status da conta"
          {...register('status')}
          error={errors.status}
        />
        <Select
          htmlFor="level"
          options={optionsLevelUser}
          label="Nível de acesso do usuário"
          {...register('level')}
          error={errors.level}
        />
      </SimpleGrid>
      <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
        <Input
          htmlFor="password"
          type="password"
          label="Senha"
          {...register('password')}
          error={errors.password}
        />
        <Input
          htmlFor="password_confirmation"
          type="password"
          label="Confirmação da senha"
          {...register('password_confirmation')}
          error={errors.password_confirmation}
        />
      </SimpleGrid>
    </FormLayout>
  )
}
