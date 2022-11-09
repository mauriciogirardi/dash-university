import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Td,
  Text,
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
import { useStudents } from '../../services/hooks/students/useStudents'
import { queryClient } from '../../services/queryClient'

export default function StudentsList() {
  const router = useRouter()
  const toast = useToast()
  const [page, setPage] = useState(1)
  const { data, isLoading, error, isFetching } = useStudents(page)

  if (error) {
    return (
      <ErrorList message="Ocorreu um erro no carregamento da listagem de estudantes." />
    )
  }

  const deleteStudent = useMutation(
    async (id: string) => {
      await api.delete(`/students/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('student')
      },
    }
  )

  const handleDeleteStudent = async (id: string) => {
    try {
      await deleteStudent.mutateAsync(id)
      toast({
        title: 'Estudante',
        description: 'Estudante deletado com sucesso!',
        status: 'success',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    } catch (err) {
      console.error(err)
      toast({
        title: 'Estudante',
        description: 'Error ao deletar o estudante, tente novamente!',
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    }
  }

  const handleEditStudent = async (id: string) => {
    router.push(`/students/create?id=${id}`)
  }

  return (
    <>
      <Head>
        <title>Estudantes</title>
      </Head>

      <DefaultLayout>
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Alunos
              {!isLoading && isFetching && (
                <Spinner size="md" color="blue.200" ml="2" />
              )}
            </Heading>
            <Link href="students/create">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                cursor="pointer"
              >
                Cadastrar um aluno
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex align="center" justify="center" h="350px">
              <Spinner color="green.500" size="lg" />
            </Flex>
          ) : (
            <>
              <Table
                tableHeader={[
                  'Usuário',
                  'Status',
                  'Data de cadastro',
                  'Detalhes',
                ]}
              >
                {data?.students.map((student) => {
                  return (
                    <Tr key={student.id}>
                      <Td>
                        <Box>
                          <Text>{student.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {student.email}
                          </Text>
                        </Box>
                      </Td>
                      <Td
                        color={
                          student.status === 'cursando'
                            ? 'green.500'
                            : 'red.500'
                        }
                        textTransform="capitalize"
                      >
                        {student.status}
                      </Td>
                      <Td>{student.created_at}</Td>
                      <Td>
                        <ChakraLink _hover={{ color: 'gray.300' }}>
                          <Link href={`/students/details?id=${student.id}`}>
                            Ver detalhes
                          </Link>
                        </ChakraLink>
                      </Td>

                      <Td textAlign="right">
                        <ActionsButton
                          onDelete={() => handleDeleteStudent(student.id)}
                          onEdit={() => handleEditStudent(student.id)}
                        />
                      </Td>
                    </Tr>
                  )
                })}
              </Table>

              <Pagination
                onPageChange={setPage}
                totalCountRegister={data?.totalCount ?? 0}
                currentPage={page}
                registersPerPage={data?.students.length}
              />
            </>
          )}
        </Box>
      </DefaultLayout>
    </>
  )
}
