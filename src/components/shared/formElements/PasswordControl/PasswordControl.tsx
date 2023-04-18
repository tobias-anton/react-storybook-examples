import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { __DEV__ } from '@chakra-ui/utils';
import React, { FC, ForwardedRef } from 'react';
import { useController } from 'react-hook-form';
import { useBoolean } from '../../../../hooks/useBoolean';
import { FormControl } from '../FormControl';
import { InputControlProps } from '../InputControl';

export type PasswordControlProps = Omit<InputControlProps, 'children'>;

export const PasswordControl: FC<PasswordControlProps> = React.forwardRef(
  (props: PasswordControlProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, label, control, placeholder, defaultValue = '', inputProps, ...rest } = props;
    const { field } = useController({
      name,
      control,
      defaultValue,
    });
    const [showPassword, { toggle }] = useBoolean(false);

    return (
      <FormControl name={name} label={label} control={control} {...rest}>
        <InputGroup>
          <Input
            {...field}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            {...inputProps}
            ref={ref}
          />
          <InputRightAddon onClick={toggle}>{showPassword ? <ViewOffIcon /> : <ViewIcon />}</InputRightAddon>
        </InputGroup>
      </FormControl>
    );
  }
);

if (__DEV__) {
  PasswordControl.displayName = 'PasswordControl';
}

export default PasswordControl;
