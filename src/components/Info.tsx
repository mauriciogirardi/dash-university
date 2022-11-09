import { Flex, Text, TextProps } from '@chakra-ui/react'

type InfoProps = TextProps & {
  label: string
  value?: string
}

export const Info = ({ label, value, ...rest }: InfoProps) => {
  return (
    <Flex flexDir="column">
      <Text color="gray.300" fontWeight="medium" fontSize="sm">
        {label}
      </Text>
      <Text fontWeight="light" {...rest}>
        {value}
      </Text>
    </Flex>
  )
}
