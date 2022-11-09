import { Text } from '@chakra-ui/react'

interface LogoProps {
  showProfileData?: boolean
}

export function Logo({ showProfileData }: LogoProps) {
  return (
    <Text
      fontSize={['2xl', '3xl']}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      dash
      <Text as="span" color="green.500" ml="1" fontSize="3xl">
        .
      </Text>
      {showProfileData && <Text as="span">university</Text>}
    </Text>
  )
}
