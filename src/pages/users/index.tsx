import { useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Td,
  Text,
  Tr,
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import { RiAddLine } from 'react-icons/ri'
import Head from 'next/head'

import { DefaultLayout } from '../../layout/DefaultLayout'
import { ActionsButton } from '../../components/Table/ActionsButtons'
import { Pagination } from '../../components/Table/Pagination'
import { Table } from '../../components/Table'
import { ErrorList } from '../../components/ErrorList'
import { transformColor } from '../../utils/transformColor'
import { useUsers } from '../../services/hooks/users/useUsers'
import { api } from '../../services/axios'
import { useMutation } from 'react-query'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'

export default function UsersList() {
  const router = useRouter()
  const toast = useToast()
  const [page, setPage] = useState(1)
  const { data, isLoading, error, isFetching } = useUsers(page)

  if (error) {
    return (
      <ErrorList message="Ocorreu um erro no carregamento da listagem de usuários." />
    )
  }

  const deleteUser = useMutation(
    async (id: string) => {
      await api.delete(`/users/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    }
  )

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser.mutateAsync(id)
      toast({
        title: 'Usuário',
        description: 'Usuário deletado com sucesso!',
        status: 'success',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    } catch (err) {
      console.error(err)
      toast({
        title: 'Usuário',
        description: 'Error ao deletar o usuário, tente novamente!',
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 2000,
      })
    }
  }

  const handleEditUser = async (id: string) => {
    router.push(`/users/create?id=${id}`)
  }

  return (
    <>
      <Head>
        <title>Usuários</title>
      </Head>

      <DefaultLayout>
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="md" color="blue.200" ml="2" />
              )}
            </Heading>
            <Link href="users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                cursor="pointer"
              >
                Criar novo usuário
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
                tableHeader={['Usuário', 'Status', 'Data de cadastro', 'Nível']}
              >
                {data?.users.map((user) => {
                  return (
                    <Tr key={user.id}>
                      <Td>
                        <Box>
                          <Text>{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={
                            user.status === 'ativo' ? 'green' : 'red'
                          }
                          variant="subtle"
                        >
                          {user.status}
                        </Badge>
                      </Td>
                      <Td>{user.created_at}</Td>
                      <Td
                        textTransform="capitalize"
                        color={transformColor(user.level)}
                      >
                        {user.level}
                      </Td>
                      <Td textAlign="right">
                        <ActionsButton
                          onDelete={() => handleDeleteUser(user.id)}
                          onEdit={() => handleEditUser(user.id)}
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
                registersPerPage={data?.users.length}
              />
            </>
          )}
        </Box>
      </DefaultLayout>
    </>
  )
}
