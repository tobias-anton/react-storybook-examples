import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import { __DEV__ } from '@chakra-ui/utils';
import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import { BaseProps, FormControl } from '../FormControl';

export type NumberInputControlProps = BaseProps & {
  numberInputProps?: NumberInputProps;
  showStepper?: boolean;
  children?: React.ReactNode;
};

export const NumberInputControl: FC<NumberInputControlProps> = React.forwardRef(
  (props: NumberInputControlProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {
      name,
      label,
      control,
      defaultValue = '',
      showStepper = false,
      children,
      numberInputProps,
      placeholder,
      isDisabled,
      ...rest
    } = props;

    const { field } = useController({
      name,
      control,
      defaultValue,
    });

    return (
      <FormControl name={name} label={label} control={control} isDisabled={isDisabled} {...rest}>
        <NumberInput {...field} id={name} onChange={field.onChange} isDisabled={isDisabled} {...numberInputProps}>
          <NumberInputField name={name} ref={ref} placeholder={numberInputProps?.placeholder ?? placeholder ?? ''} />
          {showStepper && (
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          )}
          {children}
        </NumberInput>
      </FormControl>
    );
  }
);

if (__DEV__) {
  NumberInputControl.displayName = 'NumberInputControl';
}

export default NumberInputControl;
