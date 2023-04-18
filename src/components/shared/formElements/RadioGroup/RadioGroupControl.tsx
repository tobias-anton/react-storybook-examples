import { Radio, RadioGroup, UseRadioProps } from '@chakra-ui/radio';
import { VStack } from '@chakra-ui/react';
import { __DEV__ } from '@chakra-ui/utils';
import React, { FC, ForwardedRef } from 'react';
import { useController } from 'react-hook-form';
import { BaseProps, FormControl } from '../FormControl';

type OptionProps = UseRadioProps & { children?: React.ReactNode };

export type RadioGroupControlProps = BaseProps & {
  /** List of options pick able by radio buttons */
  options: OptionProps[];
};

export const RadioGroupControl: FC<RadioGroupControlProps> = React.forwardRef(
  (props: RadioGroupControlProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, label, control, defaultValue = '', children, options, ...rest } = props;

    const { field } = useController({
      name,
      control,
      defaultValue,
    });

    return (
      <FormControl name={name} label={label} control={control} {...rest}>
        {children ?? (
          <RadioGroup {...field} ref={ref} w={'full'} role="group">
            <VStack align="flex-start" spacing={2}>
              {options.map((option) => (
                <Radio key={option.value} {...option}>
                  {option.children ?? null}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        )}
      </FormControl>
    );
  }
);

if (__DEV__) {
  RadioGroupControl.displayName = 'RadioGroupControl';
}
