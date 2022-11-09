import {
  Popover as PopoverChakra,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverProps as PopoverPropsChakra,
  PopoverTrigger,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type PopoverProps = PopoverPropsChakra & {
  children: ReactNode
  content?: ReactNode
  title?: ReactNode
  footer?: ReactNode
}

export const Popover = ({
  children,
  content,
  title,
  footer,
  ...props
}: PopoverProps) => {
  return (
    <PopoverChakra {...props}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent bg="gray.700" color="gray.100" borderColor="gray.500">
        <PopoverArrow bg="gray.700" />
        <PopoverCloseButton _hover={{ color: 'red.500' }} />
        {!!title && (
          <PopoverHeader borderColor="gray.500">{title}</PopoverHeader>
        )}
        {!!content && <PopoverBody>{content}</PopoverBody>}
        {!!footer && (
          <PopoverFooter borderColor="gray.500">{footer}</PopoverFooter>
        )}
      </PopoverContent>
    </PopoverChakra>
  )
}
