/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  Box,
  FormControl as ChakraFormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { Control, useController } from 'react-hook-form';

export interface BaseProps extends Omit<FormControlProps, 'label'> {
  name: string;
  /**
   * Here, any is explicitly desired, since at this point the type of the form is not
   * yet known and generic cannot be used without further ado. The type of control is also not important.
   */
  control: Control<any> | undefined;
  defaultValue?: string;
  label?: React.ReactNode;
  labelProps?: FormLabelProps;

  helperText?: React.ReactNode;
  helperTextProps?: FormHelperTextProps & {
    alwaysVisible?: boolean;
  };

  errorMessageProps?: FormErrorMessageProps;
}

export const FormControl: FC<BaseProps> = (props: BaseProps) => {
  const {
    children,
    name,
    control,
    label,
    labelProps,
    helperText,
    helperTextProps,
    defaultValue,
    errorMessageProps,
    ...rest
  } = props;

  const { fieldState, formState } = useController({
    name,
    control,
    defaultValue,
  });

  const isInvalid = !!fieldState.error && (fieldState.isTouched || formState.isSubmitted);

  const reserveHelperTextSpace = helperTextProps?.alwaysVisible && helperText;

  return (
    <ChakraFormControl isInvalid={isInvalid} {...rest}>
      {label && <FormLabel {...labelProps}>{label}</FormLabel>}

      {children}

      {/*Error container*/}
      <Box minH={reserveHelperTextSpace ? 8 : 4} mt={2}>
        {fieldState.error && (
          <FormErrorMessage mt={0} {...errorMessageProps}>
            {fieldState.error.message}
          </FormErrorMessage>
        )}
        {helperText && (!fieldState.error || helperTextProps?.alwaysVisible) && (
          <FormHelperText mt={0} {...helperTextProps}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    </ChakraFormControl>
  );
};
