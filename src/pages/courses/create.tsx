import { SimpleGrid, Textarea, useToast } from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../../components/Form/Input'
import { FormLayout } from '../../layout/FormLayout'
import { Select } from '../../components/Form/Select'
import { optionsStatus } from './utils'
import { useEffect, useState } from 'react'
import { api } from '../../services/axios'
import { useRouter } from 'next/router'
import { Course } from '../../types/Course'
import { queryClient } from '../../services/queryClient'
import { useMutation } from 'react-query'

type CreateCourseFormData =
  | {
      name: string
      email: string
      semester: string
      status: string
      teacher: string
      description: string
      id_teacher: string
    }
  | FieldValues

type EditCourseFormData = {
  courseId: string
  data: CreateCourseFormData
}

type OptionTeachers = {
  value: string
  name: string
}

const createCourseFormSchema = yup.object({
  name: yup.string().required('Campo é obrigatório'),
  semester: yup.string().required('Campo é obrigatório'),
  status: yup.string().required('Campo é obrigatório'),
  teacher: yup.string().required('Campo é obrigatório'),
})

export default function CreateStudent() {
  const route = useRouter()
  const toast = useToast()
  const [optionTeachers, setSelectTeachers] = useState<OptionTeachers[]>([])
  const [courseDataEdit, setCourseDataEdit] = useState<Course>()
  const { id } = route.query as { id: string }
  const courseId = id ? String(id) : false

  const fetchCourse = async () => {
    try {
      const { data } = await api.get(`/courses/${courseId}`)
      setCourseDataEdit(data.course)
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
    resolver: yupResolver(createCourseFormSchema),
  })

  const findNameTeacher = (id: string) => {
    return optionTeachers.find((t) => t.value === id)?.name
  }

  const createCourse = useMutation(
    async (course: CreateCourseFormData) => {
      await api.post('/courses', {
        course: {
          ...course,
          created_at: new Date(),
          id_teacher: course.teacher,
          teacher: findNameTeacher(course.teacher),
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('course')
      },
    }
  )

  const editCourse = useMutation(
    async ({ data, courseId }: EditCourseFormData) => {
      await api.put<EditCourseFormData>(`/courses/${courseId}`, {
        course: {
          ...data,
          created_at: new Date(),
          id_teacher: data.teacher,
          teacher: findNameTeacher(data.teacher),
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('course')
      },
    }
  )

  const handleCreateCourse: SubmitHandler<CreateCourseFormData> = async (
    data
  ) => {
    try {
      courseId
        ? await editCourse.mutateAsync({ courseId, data })
        : await createCourse.mutateAsync(data)

      toast({
        title: 'Curso',
        description: `Curso ${
          courseId ? 'editado' : 'cadastrado'
        } com sucesso!`,
        status: 'success',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
      reset()
      route.push('/courses')
    } catch (err) {
      console.error(err)
      toast({
        title: 'Curso',
        description: `Houve um error ao ${
          courseId ? 'editar' : 'criar'
        } Curso, tente novamente!`,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    }
  }

  const optionsSelectTeachers = async () => {
    try {
      const { data } = await api.get('teachers-options')
      setSelectTeachers(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (courseDataEdit?.id) {
      setValue('name', courseDataEdit.name)
      setValue('description', courseDataEdit.description)
      setValue('status', courseDataEdit.status)
      setValue('id_teacher', courseDataEdit.id_teacher)
      setValue('semester', courseDataEdit.semester)
    }
  }, [courseDataEdit])

  useEffect(() => {
    optionsSelectTeachers()
    if (courseId) {
      fetchCourse()
    }
  }, [])

  return (
    <FormLayout
      title={courseId ? 'Editar curso' : 'Criar curso'}
      onSubmit={handleSubmit(handleCreateCourse)}
      isSubmitting={isSubmitting}
      disabledSaveButton={!isDirty}
    >
      <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
        <Input
          htmlFor="name"
          label="Nome do curso"
          error={errors.name}
          {...register('name')}
        />
        <Input
          htmlFor="semester"
          type="number"
          label="Quantos semestre (3)"
          error={errors.semester}
          {...register('semester')}
        />
      </SimpleGrid>
      <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
        <Select
          htmlFor="status"
          options={optionsStatus}
          label="Status do curso"
          {...register('status')}
          error={errors.status}
        />
        <Select
          htmlFor="teacher"
          options={optionTeachers}
          label="Professor"
          {...register('teacher')}
          error={errors.teacher}
        />
      </SimpleGrid>
      <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
        <Textarea
          placeholder="Descrição do curso"
          focusBorderColor="green.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{ bgColor: 'gray.900' }}
          {...register('description')}
        />
      </SimpleGrid>
    </FormLayout>
  )
}
