import { ElementType } from 'react'
import { Text, Icon, Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { ActiveLink } from './ActiveLink'

interface NavLinkProps extends LinkProps {
  title: string
  icon: ElementType
  href: string
}

export function NavLink({ title, icon, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        display="flex"
        align="center"
        _hover={{ color: 'green.400' }}
        {...rest}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {title}
        </Text>
      </ChakraLink>
    </ActiveLink>
  )
}
