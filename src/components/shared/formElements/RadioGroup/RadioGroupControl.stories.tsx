import { Meta, Story } from '@storybook/react';
import { RadioGroupControl, RadioGroupControlProps } from './RadioGroupControl';

import { Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ReactNode } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { createRadioValidationSchema } from '../../../../utils/formValidation';

const radioGroupName = 'Tarif';
const radioGroupLabel = 'Wähle einen Tarif';
const radioGroupHelperText = 'Diese Angabe wird für unsere Unterlagen benötigt!';

export default {
  title: 'components/shared/FormControl/RadioButton',
  args: {
    label: radioGroupLabel,
    name: radioGroupName,
    options: [
      { children: 'Einheitstarif', value: 'Einheitstarif' },
      { children: 'Hochtarif', value: 'Hochtarif' },
    ],
  },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    name: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

type RadioGroupComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
  withSubmitButton?: boolean;
} & Omit<RadioGroupControlProps, 'control'>;
const RadioGroupComponent: React.FC<RadioGroupComponentProps> = ({ withSubmitButton = false, formConfig, ...rest }) => {
  const { control, formState, handleSubmit } = useForm({ ...formConfig });

  return (
    <form>
      <RadioGroupControl control={control} {...rest} />
      {withSubmitButton && <Button children={'Submit'} onClick={handleSubmit(() => {})} />}
    </form>
  );
};

export const Default: Story<RadioGroupControlProps> = (args) => <RadioGroupComponent {...args} />;

export const SomeDisabled: Story<RadioGroupControlProps> = (args) => <RadioGroupComponent {...args} />;
SomeDisabled.args = {
  options: [
    { children: 'Einheitstarif', value: 'Einheitstarif', isDisabled: true },
    { children: 'Hochtarif', value: 'Hochtarif' },
  ],
};

export const WithHelperText: Story<RadioGroupControlProps> = (args) => (
  <RadioGroupComponent helperText={radioGroupHelperText} {...args} />
);

const radioWithValidationSchema = yup.object().shape({
  [radioGroupName]: createRadioValidationSchema({}),
});

const radioWithValidationFormConfig: UseFormProps = {
  resolver: yupResolver(radioWithValidationSchema),
  mode: 'onTouched',
};
export const WithValidation: Story<RadioGroupControlProps> = (args) => (
  <RadioGroupComponent
    isRequired
    helperText={radioGroupHelperText}
    {...args}
    formConfig={radioWithValidationFormConfig}
    withSubmitButton
  />
);
