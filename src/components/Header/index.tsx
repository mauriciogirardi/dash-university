import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react'

import { Logo } from './Logo'
import { Profile } from './Profile'
import { NotificationNav } from './NotificationNav'
import { SearchInput } from './SearchInput'
import { RiMenuLine } from 'react-icons/ri'
import { useSidebarDrawer } from '../../hooks/useSidebarDrawer'

export function Header() {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      maxW={1480}
      w="100%"
      h="20"
      mx="auto"
      mt="4"
      px={['6', '4']}
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="open navigation"
          type="button"
          mr="6"
          onClick={onOpen}
          variant="unstyled"
          icon={<Icon as={RiMenuLine} fontSize="30" />}
        />
      )}

      <Logo showProfileData={isWideVersion} />

      {isWideVersion && <SearchInput />}

      <Flex align="center" ml="auto">
        <NotificationNav />
        <Profile
          avatar="https://github.com/mauriciogirardi.png"
          name="Mauricio Girardi"
          email={'mauricio@yahoo.com'}
          showProfileData={isWideVersion}
        />
      </Flex>
    </Flex>
  )
}
