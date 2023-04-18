import { HStack, PinInput, PinInputField, PinInputProps, StackProps } from '@chakra-ui/react';
import { __DEV__ } from '@chakra-ui/utils';
import React, { FC, ForwardedRef } from 'react';
import { useController } from 'react-hook-form';
import { BaseProps, FormControl } from '../FormControl';

export type PinInputControlProps = BaseProps & {
  pinAmount: number;
  stackProps?: StackProps;
  pinInputProps?: Omit<PinInputProps, 'children'>;
};

export const PinInputControl: FC<PinInputControlProps> = React.forwardRef(
  (props: PinInputControlProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, label, control, defaultValue = '', pinAmount, stackProps, pinInputProps, ...rest } = props;

    const { field, formState, fieldState } = useController({
      name,
      control,
      defaultValue,
    });

    const renderedPinInputFields = Array(pinAmount)
      .fill(null)
      .map((noop, i) => <PinInputField key={i} ref={ref} />);

    const isInvalid = !!fieldState.error && formState.isSubmitted;

    return (
      <FormControl name={name} label={label} control={control} {...rest}>
        <HStack {...stackProps}>
          <PinInput {...field} isDisabled={formState.isSubmitting} isInvalid={isInvalid} {...pinInputProps}>
            {renderedPinInputFields}
          </PinInput>
        </HStack>
      </FormControl>
    );
  }
);

if (__DEV__) {
  PinInputControl.displayName = 'PinInputControl';
}
