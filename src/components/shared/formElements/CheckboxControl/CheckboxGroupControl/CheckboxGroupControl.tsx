import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import { __DEV__ } from '@chakra-ui/utils';
import React, { FC, ReactNode } from 'react';
import { useController } from 'react-hook-form';
import { BaseProps, FormControl } from '../../FormControl';
import { useCheckboxGroupControl, UseCheckboxGroupControlReturn } from './useCheckboxGroupControl';

const [CheckboxGroupControlProvider, useCheckboxGroupControlContext] = createContext<UseCheckboxGroupControlReturn>({
  strict: true,
  name: 'CheckboxGroupControlContext',
  errorMessage:
    'checkboxGroupControlContext: `context` is undefined. Seems you forgot to wrap CheckboxGroupControl components in `<CheckboxGroupControlContainer />`',
});

/* -------------------------------------------------------------------------------------------------
 * Checkbox group control container
 * -----------------------------------------------------------------------------------------------*/

export type CheckboxGroupControlContainerProps = Omit<BaseProps, 'defaultValue'> & {
  children: ReactNode;
  defaultValues?: (string | number)[];
};

export const CheckboxGroupControlContainer: FC<CheckboxGroupControlContainerProps> = (
  props: CheckboxGroupControlContainerProps
) => {
  const { name, label, control, defaultValues, children, ...rest } = props;

  const context = useCheckboxGroupControl({ name, control, defaultValues });

  return (
    <CheckboxGroupControlProvider value={context}>
      <FormControl name={name} label={label} control={control} {...rest}>
        {children}
      </FormControl>
    </CheckboxGroupControlProvider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Checkbox group control
 * -----------------------------------------------------------------------------------------------*/

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type CheckboxGroupControlProps = Omit<
  Overwrite<CheckboxProps, { value: string | number }> & { label?: string },
  'name'
>;

export const CheckboxGroupControl: FC<CheckboxGroupControlProps> = React.forwardRef(
  (props: CheckboxGroupControlProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { checkboxGroupName, control, defaultValues } = useCheckboxGroupControlContext();
    const { label, children, ...rest } = props;

    const { field } = useController({
      name: checkboxGroupName,
      control,
      defaultValue: defaultValues ?? [],
    });

    const handleCheckboxChange = (value: string | number, checked: boolean) => {
      if (checked) {
        field.onChange([...field.value, value]);
        field.onBlur();
      } else {
        field.onChange(field.value.filter((v: string | number) => v !== value));
      }
    };

    return (
      <Checkbox
        onChange={(e) => handleCheckboxChange(props.value, e.target.checked)}
        isChecked={field.value.includes(props.value)}
        ref={ref}
        {...rest}
      >
        {label}
        {children}
      </Checkbox>
    );
  }
);

if (__DEV__) {
  CheckboxGroupControl.displayName = 'CheckboxGroupControl';
}
