import { Flex, Icon, IconButton } from '@chakra-ui/react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

interface ActionsButtonProps {
  isAvailableEdit?: boolean
  isAvailableDelete?: boolean
  onDelete: () => void
  onEdit: () => void
}

export const ActionsButton = ({
  isAvailableDelete = true,
  isAvailableEdit = true,
  onDelete,
  onEdit,
}: ActionsButtonProps) => {
  return (
    <Flex justify="flex-end">
      {isAvailableEdit && (
        <IconButton
          aria-label="editar"
          icon={<Icon as={FiEdit2} fontSize="20" />}
          variant="unstyled"
          _hover={{ color: 'green.400' }}
          color="green.200"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={onEdit}
        />
      )}
      {isAvailableDelete && (
        <IconButton
          aria-label="deletar"
          icon={<Icon as={FiTrash2} fontSize="20" />}
          variant="unstyled"
          _hover={{ color: 'red.400' }}
          color="red.200"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={onDelete}
        />
      )}
    </Flex>
  )
}
