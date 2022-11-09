import {
  Box,
  Table as TableChakra,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface TableProps {
  isAvailableActionEdit?: boolean
  isAvailableActionDelete?: boolean
  children: ReactNode
  tableHeader: string[]
}

export const Table = ({
  isAvailableActionDelete = true,
  isAvailableActionEdit = true,
  children,
  tableHeader,
}: TableProps) => {
  return (
    <Box overflow="auto" w={['300px', '650px', '100%']} h={['550px']}>
      <TableChakra colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            {tableHeader.map((header) => (
              <Th whiteSpace="nowrap" key={header}>
                {header}
              </Th>
            ))}

            {(isAvailableActionDelete || isAvailableActionEdit) && (
              <Th textAlign="right">Ações</Th>
            )}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </TableChakra>
    </Box>
  )
}
