/* eslint-disable  @typescript-eslint/no-explicit-any */
import { isArray, __DEV__ } from '@chakra-ui/utils';
import { Props as ReactSelectProps, Select as ChakraReactSelect, SelectInstance } from 'chakra-react-select';
import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import { BaseProps, FormControl } from '../FormControl';

export type ReactSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type ReactSelectGroup = {
  label: string;
  options: ReactSelectOption[];
};

export type ReactSelectOptions = ReactSelectOption[] | ReactSelectGroup[];

export type ReactSelectControlProps = Omit<BaseProps, 'defaultValue'> & {
  reactSelectProps?: ReactSelectProps;
  defaultValue?: string | string[];
  children?: React.ReactNode;
};

export const ReactSelectControl: FC<ReactSelectControlProps> = React.forwardRef(
  (props: ReactSelectControlProps, ref: React.ForwardedRef<SelectInstance<any, any>> | undefined) => {
    const { name, label, control, defaultValue = '', reactSelectProps, children, placeholder, ...rest } = props;

    const getOptions = (): ReactSelectOption[] => {
      const reactSelectOptions = reactSelectProps?.options as ReactSelectOptions;

      if (!reactSelectOptions || reactSelectOptions.length === 0) {
        return [];
      }

      const isGroupType = !((reactSelectOptions[0] as ReactSelectGroup)?.options === undefined);

      let options: ReactSelectOption[] = [];

      // Extract the options, as these can also be grouped together
      if (isGroupType) {
        reactSelectOptions.map((groupOption) => {
          options = options.concat((groupOption as ReactSelectGroup).options);
        });
      } else {
        options = options.concat(reactSelectOptions as ReactSelectOption[]);
      }

      return options;
    };

    const filterDefaultOption = () => {
      const options = getOptions();

      for (const option of options) {
        if (option.value === defaultValue) {
          return option;
        }
      }

      return '';
    };

    const filterDefaultOptions = () => {
      const options = getOptions();

      const defaultOptions: ReactSelectOption[] = [];

      const defaultValues = isArray(defaultValue) ? defaultValue : [defaultValue];

      for (const option of options) {
        if (defaultValues.includes(option.value)) {
          defaultOptions.push(option);
        }
      }

      return defaultOptions.length === 0 ? '' : defaultOptions;
    };

    const isMulti = reactSelectProps?.isMulti ?? false;

    const { field } = useController({
      name,
      control,
      defaultValue: isMulti ? filterDefaultOptions() : filterDefaultOption(),
    });

    return (
      <FormControl name={name} label={label} control={control} {...rest}>
        {children ?? <ChakraReactSelect {...field} {...reactSelectProps} placeholder={placeholder} ref={ref} />}
      </FormControl>
    );
  }
);

if (__DEV__) {
  ReactSelectControl.displayName = 'ReactSelectControl';
}

export default ReactSelectControl;
