import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction, ElementType } from 'react'
import {
  Input as InputChakra,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftElement,
  Box,
  Icon,
  FormErrorMessage,
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  label?: string
  icon?: ElementType
  isFilled?: boolean
  error?: FieldError | any
  htmlFor?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { htmlFor, label, icon, error = null, isFilled = false, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={htmlFor}>{label}</FormLabel>}

      <InputGroup>
        {!!icon && (
          <InputLeftElement>
            <Icon
              as={icon}
              fontSize="20"
              mt="2"
              color={isFilled ? 'green.500' : 'gray.400'}
            />
          </InputLeftElement>
        )}

        <InputChakra
          autoComplete="off"
          id={htmlFor}
          focusBorderColor={!!error ? 'red.500' : 'green.500'}
          bgColor="gray.900"
          variant="filled"
          size="lg"
          _hover={{ bgColor: 'gray.900' }}
          ref={ref}
          {...rest}
        />
      </InputGroup>

      {!!error && (
        <Box mt="-1" mb="-2">
          <FormErrorMessage>{error.message}</FormErrorMessage>
        </Box>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
