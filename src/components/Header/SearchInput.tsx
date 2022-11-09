import { Flex, Input, Icon } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'

export function SearchInput() {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      maxW={400}
      alignSelf="center"
      position="relative"
      borderRadius="full"
      bg="gray.800"
      color="gray.200"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  )
}
