import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FiArrowLeft, FiBook } from 'react-icons/fi'
import { ErrorList } from '../../components/ErrorList'
import { Info } from '../../components/Info'
import { DefaultLayout } from '../../layout/DefaultLayout'
import { useCourse } from '../../services/hooks/courses/useCourse'

export default function Grade() {
  const route = useRouter()
  const { id } = route.query as { id: string }
  const courseId = String(id)

  const { data, isLoading, error } = useCourse(courseId)

  if (error) {
    return (
      <ErrorList message="Ocorreu um erro no carregamento od detalhes do professor." />
    )
  }

  return (
    <>
      <Head>
        <title>Grade</title>
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
                  Detalhes do curso
                </Heading>
                <Button
                  size="sm"
                  colorScheme="green"
                  leftIcon={<Icon as={FiArrowLeft} />}
                  onClick={() => route.push('/courses')}
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
                    Curso - {data?.name}
                  </Text>
                  <Text color="gray.300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia ipsa sunt cum minus distinctio ad saepe enim doloribus
                    dignissimos amet, vitae quas odit veniam, nemo magni
                    laudantium. Incidunt, nobis laborum.
                  </Text>
                </Box>
              </Flex>
              <Divider my="5" borderColor="gray.500" />

              <SimpleGrid minChildWidth="200px" spacing="8" w="100%">
                <Info label="Curso" value={data?.name} />
                <Info label="Coordenador" value={data?.teacher} />
                <Info
                  label="Status"
                  value={data?.status}
                  textTransform="capitalize"
                  color={data?.status === 'ativo' ? 'green.400' : 'red.400'}
                />
                <Info label="Duração" value={`${data?.semester} semestres`} />
              </SimpleGrid>

              <Box mt="5">
                {Array.from(
                  { length: Number(data?.semester) },
                  (_, i) => i + 1
                ).map((i) => (
                  <Accordion allowMultiple key={i}>
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Flex
                            flex="1"
                            textAlign="left"
                            align="center"
                            gap="2"
                            color="gray.200"
                          >
                            <Icon as={FiBook} color="green.300" />
                            <Text>{`${i}° Semestre `}</Text>
                          </Flex>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ))}
              </Box>
            </>
          )}
        </Box>
      </DefaultLayout>
    </>
  )
}
