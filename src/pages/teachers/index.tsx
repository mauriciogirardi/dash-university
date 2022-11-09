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
import { useTeachers } from '../../services/hooks/teachers/useTeachers'
import { queryClient } from '../../services/queryClient'

export default function TeachersList() {
  const router = useRouter()
  const toast = useToast()
  const [page, setPage] = useState(1)
  const { data, isLoading, error, isFetching } = useTeachers(page)

  if (error) {
    return (
      <ErrorList message="Ocorreu um erro no carregamento da listagem de professores." />
    )
  }

  const deleteTeacher = useMutation(
    async (id: string) => {
      await api.delete(`/teachers/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('teacher')
      },
    }
  )

  const handleDeleteTeacher = async (id: string) => {
    try {
      await deleteTeacher.mutateAsync(id)
      toast({
        title: 'Professor',
        description: 'Professor deletado com sucesso!',
        status: 'success',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    } catch (err) {
      console.error(err)
      toast({
        title: 'Professor',
        description: 'Error ao deletar o professor, tente novamente!',
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    }
  }

  const handleEditTeacher = async (id: string) => {
    router.push(`/teachers/create?id=${id}`)
  }

  return (
    <>
      <Head>
        <title>Professores</title>
      </Head>

      <DefaultLayout>
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Professores
              {!isLoading && isFetching && (
                <Spinner size="md" color="blue.200" ml="2" />
              )}
            </Heading>
            <Link href="teachers/create">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                cursor="pointer"
              >
                Cadastrar um professor
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
                  'Curso',
                  'Data de Contratação',
                  'Detalhes',
                ]}
              >
                {data?.teachers.map((teacher) => {
                  return (
                    <Tr key={teacher.id}>
                      <Td>
                        <Box>
                          <Text>{teacher.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {teacher.email}
                          </Text>
                        </Box>
                      </Td>
                      <Td>{teacher.area_teaching}</Td>
                      <Td>{teacher.hiring_date}</Td>
                      <Td>
                        <ChakraLink _hover={{ color: 'gray.300' }}>
                          <Link href={`/teachers/details?id=${teacher.id}`}>
                            Ver detalhes
                          </Link>
                        </ChakraLink>
                      </Td>

                      <Td textAlign="right">
                        <ActionsButton
                          onDelete={() => handleDeleteTeacher(teacher.id)}
                          onEdit={() => handleEditTeacher(teacher.id)}
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
                registersPerPage={data?.teachers.length}
              />
            </>
          )}
        </Box>
      </DefaultLayout>
    </>
  )
}
