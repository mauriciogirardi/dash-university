import {
  Avatar,
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Spinner,
  HStack,
  Text,
  Heading,
  Button,
  Icon,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import { ErrorList } from '../../components/ErrorList'
import { Info } from '../../components/Info'
import { DefaultLayout } from '../../layout/DefaultLayout'
import { useTeacher } from '../../services/hooks/teachers/useTeacher'

export default function DetailsTeacher() {
  const route = useRouter()
  const { id } = route.query as { id: string }
  const teacherId = String(id)

  const { data, isLoading, error } = useTeacher(teacherId)

  if (error) {
    return (
      <ErrorList message="Ocorreu um erro no carregamento od detalhes do professor." />
    )
  }

  return (
    <>
      <Head>
        <title>Detalhes Professor</title>
      </Head>

      <DefaultLayout>
        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['4', '8']}
          mb="8"
          className="animation"
        >
          {isLoading ? (
            <Flex align="center" justify="center" h="350px">
              <Spinner color="green.500" size="lg" />
            </Flex>
          ) : (
            <>
              <Flex mb="20" justify="space-between" align="center">
                <Heading size="lg" fontWeight="normal">
                  Detalhes do professor
                </Heading>
                <Button
                  size="sm"
                  colorScheme="green"
                  leftIcon={<Icon as={FiArrowLeft} />}
                  onClick={() => route.push('/teachers')}
                >
                  Voltar
                </Button>
              </Flex>

              <Flex
                flexDir={['column-reverse', 'column-reverse', 'row']}
                align="center"
                justify="space-between"
              >
                <Box w={['100%', '800px']}>
                  <Text fontWeight="medium" fontSize="2xl">
                    {data?.name}
                  </Text>
                  <Text color="gray.300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia ipsa sunt cum minus distinctio ad saepe enim doloribus
                    dignissimos amet, vitae quas odit veniam, nemo magni
                    laudantium. Incidunt, nobis laborum.
                  </Text>
                </Box>

                <Avatar name={data?.name} size="lg" mb={['5', '0']} />
              </Flex>
              <Divider my="5" borderColor="gray.500" />

              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Info value={data?.name} label="Nome completo" />
                <Info value={data?.birth} label="Data de aniversario" />
                <Info value={data?.area_teaching} label="Área de ensino" />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%" my="8">
                <Info value={data?.academic_level} label="Nível acadêmico" />
                <Info value={data?.hiring_date} label="Data de contratação" />
                <Info
                  value={data?.due_date}
                  label="Data de termino de contratação"
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Info value={data?.phone} label="Telefone" />
                <Info value={data?.email} label="E-mail" />
                <Info
                  value={data?.registration_number.toUpperCase()}
                  label="Número de registro"
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%" my="8">
                <Info value={data?.cpf} label="CPF" />
                <Info value={!!data?.rg ? data.rg : '---'} label="RG" />
                <Info value={data?.salary} label="Salario" />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%" my="8">
                <Info
                  value={!!data?.type_license ? data?.type_license : '---'}
                  label="Habilitação"
                />
              </SimpleGrid>

              <Text color="gray.300" fontWeight="bold">
                ENDEREÇO
              </Text>
              <Divider borderColor="gray.300" />
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%" my="8">
                <Info value={data?.city} label="Cidade" />
                <Info value={data?.neighborhood} label="Bairro" />
                <Info value={data?.address} label="Endereço" />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                <Info value={data?.postal_code} label="Código postal" />
              </SimpleGrid>
            </>
          )}
        </Box>
      </DefaultLayout>
    </>
  )
}
