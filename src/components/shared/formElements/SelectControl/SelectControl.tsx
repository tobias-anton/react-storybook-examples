import { Select, SelectProps } from '@chakra-ui/react';
import { __DEV__ } from '@chakra-ui/utils';
import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import { BaseProps, FormControl } from '../FormControl';
import { SelectOptionList, SelectOptionListProps } from './SelectOptionList';

export type SelectControlProps = BaseProps & {
  selectProps?: SelectProps;
  optionListProps?: SelectOptionListProps;
  children?: React.ReactNode;
};

export const SelectControl: FC<SelectControlProps> = React.forwardRef(
  (props: SelectControlProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const {
      name,
      label,
      control,
      placeholder,
      defaultValue = '',
      selectProps,
      optionListProps,
      children,
      ...rest
    } = props;

    const { field } = useController({
      name,
      control,
      defaultValue,
    });

    return (
      <FormControl name={name} label={label} control={control} {...rest}>
        {children ?? (
          <Select {...field} ref={ref} placeholder={placeholder} {...selectProps}>
            {optionListProps && <SelectOptionList {...optionListProps} />}
          </Select>
        )}
      </FormControl>
    );
  }
);

if (__DEV__) {
  SelectControl.displayName = 'SelectControl';
}

export default SelectControl;
