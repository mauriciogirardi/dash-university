import {
  SelectProps as SelectPropsChakra,
  Select as SelectChakra,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

type OptionsProps = {
  name: string
  value: string
}

type SelectProps = SelectPropsChakra & {
  options: OptionsProps[]
  label?: string
  error?: FieldError | any
  htmlFor?: string
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { options, label, error = null, htmlFor, ...props },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={htmlFor}>{label}</FormLabel>}

      <SelectChakra
        id={htmlFor}
        focusBorderColor="green.500"
        bgColor="gray.900"
        variant="filled"
        size="lg"
        _hover={{ bgColor: 'gray.900' }}
        ref={ref}
        {...props}
      >
        <>
          {options.map((option) => (
            <option
              className="option-select"
              key={option.name}
              value={option.value}
              style={{ background: '#4B4D63' }}
            >
              {option.name}
            </option>
          ))}
        </>
      </SelectChakra>

      {!!error && (
        <Box mt="-1" mb="-2">
          <FormErrorMessage>{error.message}</FormErrorMessage>
        </Box>
      )}
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)
