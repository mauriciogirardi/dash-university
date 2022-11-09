import { HStack, IconButton, Box, Text } from '@chakra-ui/react'

import { RiMessage3Line, RiNotificationLine } from 'react-icons/ri'
import { Popover } from '../Popover'

export function NotificationNav() {
  return (
    <HStack
      spacing={['6', '8']}
      mx={['6', '8']}
      pr={['6', '8']}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Popover
        title={<h5>Notificações</h5>}
        content={<p>Está é uma funcionalidade paga!</p>}
      >
        <Box position="relative">
          <IconButton
            aria-label="notificações"
            icon={<RiNotificationLine fontSize={20} />}
            _hover={{ color: 'green.500' }}
            variant="unstyled"
            alignItems="center"
            justifyContent="center"
            display="flex"
          />
          <Text
            bg="red.500"
            position="absolute"
            borderRadius="full"
            w="5"
            h="5"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="sm"
            top="0"
            right="-4px"
          >
            5
          </Text>
        </Box>
      </Popover>

      <Popover
        title={<h5>Chat</h5>}
        content={<p>Está é uma funcionalidade paga!</p>}
      >
        <IconButton
          aria-label="chat"
          icon={<RiMessage3Line fontSize={20} />}
          _hover={{ color: 'green.500' }}
          variant="unstyled"
          alignItems="center"
          justifyContent="center"
          display="flex"
        />
      </Popover>
    </HStack>
  )
}
