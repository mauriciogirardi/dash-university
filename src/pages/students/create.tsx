import {
  Box,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { optionsCourses, optionsGang, optionsStatusCourse } from './utils'
import { FormLayout } from '../../layout/FormLayout'
import { Select } from '../../components/Form/Select'
import { Input } from '../../components/Form/Input'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Student } from '../../types/Student'
import { api } from '../../services/axios'
import { useMutation } from 'react-query'
import { queryClient } from '../../services/queryClient'

type CreateStudentFormData =
  | {
      name: string
      email: string
      birth: string
      registration_number: string
      status: string
      course: string
      period: string
      semester: string
      due_date: string
      address: string
      postal_code: string
      neighborhood: string
      city: string
      phone: string
      cpf: string
    }
  | FieldValues

type EditStudentFormData = {
  studentId: string
  data: CreateStudentFormData
}

const createStudentFormSchema = yup.object({
  email: yup
    .string()
    .email('E-mail está no formato incorreto')
    .required('Campo é obrigatório'),
  name: yup.string().required('Campo é obrigatório'),
  birth: yup.string().required('Campo é obrigatório'),
  status: yup.string().required('Campo é obrigatório'),
  course: yup.string().required('Campo é obrigatório'),
  period: yup.string().required('Campo é obrigatório'),
  semester: yup.string().required('Campo é obrigatório'),
  due_date: yup.string().required('Campo é obrigatório'),
  address: yup.string().required('Campo é obrigatório'),
  postal_code: yup.string().required('Campo é obrigatório'),
  neighborhood: yup.string().required('Campo é obrigatório'),
  city: yup.string().required('Campo é obrigatório'),
  phone: yup.string().required('Campo é obrigatório'),
  cpf: yup.string().required('Campo é obrigatório'),
})

export default function CreateStudent() {
  const toast = useToast()
  const [studentDataEdit, setStudentDataEdit] = useState<Student>()
  const route = useRouter()
  const { id } = route.query as { id: string }
  const studentId = id ? String(id) : false

  const fetchStudent = async () => {
    try {
      const { data } = await api.get(`/students/${studentId}`)
      setStudentDataEdit(data.student)
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
    resolver: yupResolver(createStudentFormSchema),
  })

  const createStudent = useMutation(
    async (user: CreateStudentFormData) => {
      await api.post('/students', {
        user: {
          ...user,
          created_at: new Date(),
          registration_number: `ST${new Date().getTime()}`,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('student')
      },
    }
  )

  const editStudent = useMutation(
    async ({ data, studentId }: EditStudentFormData) => {
      await api.put<EditStudentFormData>(`/students/${studentId}`, {
        teacher: {
          ...data,
          created_at: new Date(),
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('student')
      },
    }
  )

  const handleCreateStudent: SubmitHandler<CreateStudentFormData> = async (
    data
  ) => {
    try {
      studentId
        ? await editStudent.mutateAsync({ studentId, data })
        : await createStudent.mutateAsync(data)

      toast({
        title: 'Estudante',
        description: `Estudante ${
          studentId ? 'editado' : 'cadastrado'
        } com sucesso!`,
        status: 'success',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })

      reset()
      route.push('/students')
    } catch (err) {
      console.error(err)
      toast({
        title: 'Estudante',
        description: `Houve um error ao ${
          studentId ? 'editar' : 'criar'
        } Estudante, tente novamente!`,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    }
  }

  useEffect(() => {
    if (studentDataEdit?.id) {
      setValue('name', studentDataEdit.name)
      setValue('email', studentDataEdit.email)
      setValue('address', studentDataEdit.address)
      setValue('city', studentDataEdit.city)
      setValue('cpf', studentDataEdit.cpf)
      setValue('neighborhood', studentDataEdit.neighborhood)
      setValue('postal_code', studentDataEdit.postal_code)
      setValue('phone', studentDataEdit.phone)
      setValue('rg', studentDataEdit.rg)
      setValue('birth', studentDataEdit.birth.slice(0, 10))
      setValue('semester', studentDataEdit.semester)
      setValue('due_date', studentDataEdit.due_date.slice(0, 10))
    }
  }, [studentDataEdit])

  useEffect(() => {
    if (studentId) {
      fetchStudent()
    }
  }, [])

  return (
    <FormLayout
      title={studentId ? 'Editar aluno' : 'Criar aluno'}
      onSubmit={handleSubmit(handleCreateStudent)}
      isSubmitting={isSubmitting}
      disabledSaveButton={!isDirty}
    >
      <Tabs size="sm" colorScheme="green" w="100%">
        <TabList>
          <Tab>Curso</Tab>
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
                  {...register('name')}
                  error={errors.name}
                />
                <Input
                  htmlFor="birth"
                  type="date"
                  label="Data de nascimento"
                  {...register('birth')}
                  error={errors.birth}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Select
                  htmlFor="status"
                  options={optionsStatusCourse}
                  label="Status do curso"
                  {...register('status')}
                  error={errors.status}
                />
                <Box />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Select
                  htmlFor="course"
                  options={optionsCourses}
                  label="Curso"
                  {...register('course')}
                  error={errors.course}
                />
                <Select
                  htmlFor="period"
                  options={optionsGang}
                  label="Período"
                  {...register('period')}
                  error={errors.period}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input
                  htmlFor="semester"
                  label="Semestre (2)"
                  type="number"
                  {...register('semester')}
                  error={errors.semester}
                />
                <Input
                  htmlFor="due_date"
                  type="date"
                  label="Data de vencimento do curso"
                  {...register('due_date')}
                  error={errors.due_date}
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
                  {...register('address')}
                  error={errors.address}
                />
                <Input
                  htmlFor="postal_code"
                  label="Código postal"
                  {...register('postal_code')}
                  error={errors.postal_code}
                  type="number"
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Input
                  htmlFor="city"
                  label="Cidade"
                  {...register('city')}
                  error={errors.city}
                />
                <Input
                  htmlFor="neighborhood"
                  label="bairro"
                  {...register('neighborhood')}
                  error={errors.neighborhood}
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
                  {...register('phone')}
                  type="number"
                  error={errors.phone}
                />
                <Input
                  htmlFor="email"
                  type="email"
                  label="E-mail"
                  {...register('email')}
                  error={errors.email}
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
                  type="number"
                  {...register('cpf')}
                  error={errors.cpf}
                />
                <Input
                  htmlFor="rg"
                  label="RG"
                  type="number"
                  {...register('rg')}
                />
              </SimpleGrid>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormLayout>
  )
}
