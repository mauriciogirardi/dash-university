import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Td,
  Tr,
  Link as ChakraLink,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RiAddLine } from 'react-icons/ri'
import { useMutation } from 'react-query'
import { ErrorList } from '../../components/ErrorList'
import { Table } from '../../components/Table'
import { ActionsButton } from '../../components/Table/ActionsButtons'
import { Pagination } from '../../components/Table/Pagination'
import { DefaultLayout } from '../../layout/DefaultLayout'
import { api } from '../../services/axios'
import { useCourses } from '../../services/hooks/courses/useCourses'
import { queryClient } from '../../services/queryClient'

export default function CoursesList() {
  const router = useRouter()
  const toast = useToast()
  const [page, setPage] = useState(1)
  const { data, isLoading, error, isFetching } = useCourses(page)

  if (error) {
    return (
      <ErrorList message="Ocorreu um erro no carregamento da listagem dos cursos." />
    )
  }

  const deleteCourse = useMutation(
    async (id: string) => {
      await api.delete(`/courses/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('courses')
      },
    }
  )

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourse.mutateAsync(id)
      toast({
        title: 'Curso',
        description: 'Curso deletado com sucesso!',
        status: 'success',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    } catch (err) {
      console.error(err)
      toast({
        title: 'Curso',
        description: 'Error ao deletar o curso, tente novamente!',
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    }
  }

  const handleEditCourse = async (id: string) => {
    router.push(`/courses/create?id=${id}`)
  }

  return (
    <>
      <Head>
        <title>Cursos</title>
      </Head>

      <DefaultLayout>
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Cursos
              {!isLoading && isFetching && (
                <Spinner size="md" color="blue.200" ml="2" />
              )}
            </Heading>
            <Link href="courses/create">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                cursor="pointer"
              >
                Cadastrar um curso
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex align="center" justify="center" h="350px">
              <Spinner color="green.500" size="lg" />
            </Flex>
          ) : (
            <>
              <Table tableHeader={['Curso', 'Status', 'Professor', 'Grade']}>
                {data?.courses.map((course) => (
                  <Tr key={course.id}>
                    <Td>{course.name}</Td>
                    <Td
                      textTransform="capitalize"
                      color={
                        course.status === 'ativo' ? 'green.500' : 'red.500'
                      }
                    >
                      {course.status}
                    </Td>
                    <Td>
                      <ChakraLink _hover={{ color: 'gray.300' }}>
                        <Link
                          href={`/teachers/details?id=${course.id_teacher}`}
                        >
                          {course.teacher}
                        </Link>
                      </ChakraLink>
                    </Td>
                    <Td>
                      <ChakraLink _hover={{ color: 'gray.300' }}>
                        <Link href={`/courses/grade?id=${course.id}`}>
                          Ver grade
                        </Link>
                      </ChakraLink>
                    </Td>

                    <Td textAlign="right">
                      <ActionsButton
                        onDelete={() => handleDeleteCourse(course.id)}
                        onEdit={() => handleEditCourse(course.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Table>

              <Pagination
                onPageChange={setPage}
                totalCountRegister={data?.totalCount ?? 0}
                currentPage={page}
                registersPerPage={data?.courses.length}
              />
            </>
          )}
        </Box>
      </DefaultLayout>
    </>
  )
}
