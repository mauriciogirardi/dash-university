import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import * as yup from 'yup'

import { queryClient } from '../../services/queryClient'
import { FormLayout } from '../../layout/FormLayout'
import { Teachers } from '../../types/Teacher'
import { Input } from '../../components/Form/Input'
import { api } from '../../services/axios'

type CreateTeacherFormData =
  | {
      name: string
      email: string
      hiring_date: string
      registration_number: string
      area_teaching: string
      academic_level: string
      salary: string
      type_license: string
      due_date: string
      address: string
      postal_code: string
      neighborhood: string
      city: string
      phone: string
      cpf: string
      rg: string
      birth: string
    }
  | FieldValues

type EditTeacherFormData = {
  teacherId: string
  data: CreateTeacherFormData
}

const createTeacherFormSchema = yup.object({
  email: yup
    .string()
    .email('E-mail está no formato incorreto')
    .required('Campo é obrigatório'),
  name: yup.string().required('Campo é obrigatório'),
  area_teaching: yup.string().required('Campo é obrigatório'),
  academic_level: yup.string().required('Campo é obrigatório'),
  salary: yup.string().required('Campo é obrigatório'),
  address: yup.string().required('Campo é obrigatório'),
  postal_code: yup.string().required('Campo é obrigatório'),
  neighborhood: yup.string().required('Campo é obrigatório'),
  city: yup.string().required('Campo é obrigatório'),
  phone: yup.string().required('Campo é obrigatório'),
  cpf: yup.string().required('Campo é obrigatório'),
  due_date: yup.string().required('Campo é obrigatório'),
  hiring_date: yup.string().required('Campo é obrigatório'),
  birth: yup.string().required('Campo é obrigatório'),
})

export default function CreateStudent() {
  const toast = useToast()
  const [teacherDataEdit, setTeacherDataEdit] = useState<Teachers>()
  const route = useRouter()
  const { id } = route.query as { id: string }
  const teacherId = id ? String(id) : false

  const fetchTeacher = async () => {
    try {
      const { data } = await api.get(`/teachers/${teacherId}`)
      setTeacherDataEdit(data.teacher)
    } catch (err) {
      console.error(err)
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: yupResolver(createTeacherFormSchema),
  })

  const createTeacher = useMutation(
    async (user: CreateTeacherFormData) => {
      await api.post('/teachers', {
        user: {
          ...user,
          created_at: new Date(),
          registration_number: 'A545cdk',
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('teacher')
      },
    }
  )

  const editTeacher = useMutation(
    async ({ data, teacherId }: EditTeacherFormData) => {
      await api.put<EditTeacherFormData>(`/teachers/${teacherId}`, {
        teacher: {
          ...data,
          created_at: new Date(),
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('teacher')
      },
    }
  )

  const handleCreateTeacher: SubmitHandler<CreateTeacherFormData> = async (
    data
  ) => {
    try {
      teacherId
        ? await editTeacher.mutateAsync({ teacherId, data })
        : await createTeacher.mutateAsync(data)

      toast({
        title: 'Professor',
        description: `Professor ${
          teacherId ? 'editado' : 'criado'
        } com sucesso!`,
        status: 'success',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
      reset()
      route.push('/teachers')
    } catch (err) {
      console.error(err)
      toast({
        title: 'Professor',
        description: `Houve um error ao ${
          teacherId ? 'editar' : 'criar'
        } Professor, tente novamente!`,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    if (teacherDataEdit?.id) {
      setValue('name', teacherDataEdit.name)
      setValue('email', teacherDataEdit.email)
      setValue('address', teacherDataEdit.address)
      setValue('city', teacherDataEdit.city)
      setValue('cpf', teacherDataEdit.cpf)
      setValue('academic_level', teacherDataEdit.academic_level)
      setValue('hiring_date', teacherDataEdit.hiring_date.slice(0, 10))
      setValue('due_date', teacherDataEdit.due_date.slice(0, 10))
      setValue('area_teaching', teacherDataEdit.area_teaching)
      setValue('salary', teacherDataEdit.salary)
      setValue('neighborhood', teacherDataEdit.neighborhood)
      setValue('postal_code', teacherDataEdit.postal_code)
      setValue('phone', teacherDataEdit.phone)
      setValue('rg', teacherDataEdit.rg)
      setValue('type_license', teacherDataEdit.type_license)
      setValue('birth', teacherDataEdit.birth.slice(0, 10))
    }
  }, [teacherDataEdit])

  useEffect(() => {
    if (teacherId) {
      fetchTeacher()
    }
  }, [])

  return (
    <FormLayout
      key="teacher"
      title={teacherId ? 'Editar Professor' : 'Criar Professor'}
      onSubmit={handleSubmit(handleCreateTeacher)}
      isSubmitting={isSubmitting}
      disabledSaveButton={!isDirty}
    >
      <Tabs size="sm" colorScheme="green" w="100%">
        <TabList>
          <Tab>Geral</Tab>
          <Tab>Endereço</Tab>
          <Tab>Contato</Tab>
          <Tab>Documentos</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input
                  htmlFor="name"
                  label="Nome completo"
                  error={errors.name}
                  {...register('name')}
                />
                <Input
                  htmlFor="hiring_date"
                  type="date"
                  label="Data de contratação"
                  error={errors.hiring_date}
                  {...register('hiring_date')}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input
                  htmlFor="area_teaching"
                  label="Área de ensino"
                  error={errors.area_teaching}
                  {...register('area_teaching')}
                />
                <Input
                  htmlFor="academic_level"
                  label="Nível acadêmico"
                  error={errors.academic_level}
                  {...register('academic_level')}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input
                  htmlFor="salary"
                  label="Salário"
                  error={errors.salary}
                  type="number"
                  {...register('salary')}
                />
                <Input
                  htmlFor="due_date"
                  type="date"
                  label="Data de termino contratação"
                  error={errors.due_date}
                  {...register('due_date')}
                />
              </SimpleGrid>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input
                  htmlFor="address"
                  label="Endereço com o número"
                  error={errors.address}
                  {...register('address')}
                />
                <Input
                  htmlFor="postal_code"
                  label="Código postal"
                  error={errors.postal_code}
                  type="number"
                  {...register('postal_code')}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input
                  htmlFor="city"
                  label="Cidade"
                  error={errors.city}
                  {...register('city')}
                />
                <Input
                  htmlFor="neighborhood"
                  label="bairro"
                  error={errors.neighborhood}
                  {...register('neighborhood')}
                />
              </SimpleGrid>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input
                  htmlFor="phone"
                  label="Telefone"
                  error={errors.phone}
                  type="number"
                  {...register('phone')}
                />
                <Input
                  htmlFor="email"
                  type="email"
                  label="E-mail"
                  error={errors.email}
                  {...register('email')}
                />
              </SimpleGrid>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input
                  htmlFor="cpf"
                  label="CPF"
                  error={errors.cpf}
                  type="number"
                  {...register('cpf')}
                />
                <Input
                  htmlFor="rg"
                  label="RG"
                  {...register('rg')}
                  type="number"
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input
                  htmlFor="birth"
                  label="Data de nascimento"
                  type="date"
                  error={errors.birth}
                  {...register('birth')}
                />

                <Input
                  htmlFor="type_license"
                  label="Carta de condução"
                  {...register('type_license')}
                />
              </SimpleGrid>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormLayout>
  )
}
