import { Input, InputProps } from '@chakra-ui/react';
import { __DEV__ } from '@chakra-ui/utils';
import React, { FC, ForwardedRef } from 'react';
import { useController } from 'react-hook-form';
import { BaseProps, FormControl } from '../FormControl';

export type InputControlProps = BaseProps & { inputProps?: InputProps };

export const InputControl: FC<InputControlProps> = React.forwardRef(
  (props: InputControlProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, label, control, placeholder, defaultValue = '', inputProps, children, ...rest } = props;

    const { field } = useController({
      name,
      control,
      defaultValue,
    });

    return (
      <FormControl name={name} label={label} control={control} {...rest}>
        {children ?? <Input {...field} placeholder={placeholder} {...inputProps} ref={ref} />}
      </FormControl>
    );
  }
);

if (__DEV__) {
  InputControl.displayName = 'InputControl';
}

export default InputControl;
