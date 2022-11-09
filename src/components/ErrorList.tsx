import { Flex, Icon, Text } from '@chakra-ui/react'
import { ImWarning } from 'react-icons/im'
import { DefaultLayout } from '../layout/DefaultLayout'

interface ErrorListProps {
  message: string
}

export const ErrorList = ({ message }: ErrorListProps) => {
  return (
    <DefaultLayout>
      <Flex direction="column" align="center" justify="center" h="full">
        <Icon as={ImWarning} fontSize="50" mb="10" color="yellow.500" />
        <Text fontSize="large">{message}</Text>
        <Text color="gray.300">Tente carregar a aplicação novamente!</Text>
      </Flex>
    </DefaultLayout>
  )
}
