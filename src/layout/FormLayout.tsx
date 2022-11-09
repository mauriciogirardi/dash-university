import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { DefaultLayout } from './DefaultLayout'

type FormLayoutProps = {
  children: ReactNode
  title: string
  onSubmit?: () => void
  isSubmitting?: boolean
  disabledSaveButton?: boolean
}

export const FormLayout = ({
  children,
  isSubmitting,
  onSubmit,
  title,
  disabledSaveButton,
}: FormLayoutProps) => {
  const { back } = useRouter()
  return (
    <DefaultLayout>
      <Box
        flex="1"
        borderRadius={8}
        bg="gray.800"
        p={['4', '8']}
        mb="8"
        as="form"
        onSubmit={onSubmit}
        className="animation"
      >
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            {title}
          </Heading>
        </Flex>
        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">{children}</VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Button
              onClick={back}
              colorScheme="whiteAlpha"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              disabled={disabledSaveButton}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="green"
            >
              Salvar
            </Button>
          </HStack>
        </Flex>
      </Box>
    </DefaultLayout>
  )
}
