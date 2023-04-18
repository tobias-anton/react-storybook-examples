import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { __DEV__ } from '@chakra-ui/utils';
import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import { BaseProps, FormControl } from '../../FormControl';

export type CheckboxSingleControlProps = BaseProps & {
  checkBoxProps?: CheckboxProps;
  children?: React.ReactNode;
};

export const CheckboxSingleControl: FC<CheckboxSingleControlProps> = React.forwardRef(
  (props: CheckboxSingleControlProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { name, label, control, defaultValue = '', children, checkBoxProps, ...rest } = props;
    const { field } = useController({
      name,
      control,
      defaultValue,
    });
    const isChecked = field.value;

    return (
      <FormControl name={name} control={control} {...rest}>
        <Checkbox {...field} id={name} isChecked={isChecked} ref={ref} {...checkBoxProps}>
          {label}
          {children}
        </Checkbox>
      </FormControl>
    );
  }
);

if (__DEV__) {
  CheckboxSingleControl.displayName = 'CheckboxSingleControl';
}
