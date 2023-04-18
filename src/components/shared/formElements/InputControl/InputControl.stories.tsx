import { yupResolver } from '@hookform/resolvers/yup';
import { Meta, Story } from '@storybook/react';
import { ReactNode } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { createStringValidationSchema } from '../../../../utils/formValidation';
import { InputControl, InputControlProps } from './InputControl';

const textInputName = 'name';
const textInputLabel = 'Name';
const textInputPlaceholder = 'Dein Name';
const textHelperText = 'Anhand deines Names können wir dich indentifizieren';
const numberInputName = 'kwh';
const numberInputLabel = 'kwh';
const numberInputPlaceholder = 'kwh';

const dateInputName = 'age';
const dateInputLabel = 'Alter';
const telInputName = 'tel';
const telInputLabel = 'Telefonnummer';

export default {
  title: 'components/shared/FormControl/Input',
  args: {
    name: textInputName,
    label: textInputLabel,
  },
  argTypes: {
    name: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
} as Meta;

type InputComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
} & Omit<InputControlProps, 'control'>;
const InputComponent: React.FC<InputComponentProps> = ({ formConfig, ...rest }) => {
  const { control } = useForm({ ...formConfig });

  return (
    <form>
      <InputControl control={control} {...rest} />
    </form>
  );
};

export const TextInput: Story<InputControlProps> = (args) => (
  <InputComponent placeholder={textInputPlaceholder} {...args} />
);

export const TextInputWithHelperText: Story<InputControlProps> = (args) => (
  <InputComponent helperText={textHelperText} placeholder={textInputPlaceholder} {...args} />
);

export const TextInputReadonly: Story<InputControlProps> = (args) => (
  <InputComponent defaultValue={'Sir Lanserote'} placeholder={textInputPlaceholder} isReadOnly {...args} />
);

export const TextInputDisabled: Story<InputControlProps> = (args) => (
  <InputComponent defaultValue={'Sir Lanserote'} placeholder={textInputPlaceholder} isDisabled {...args} />
);

const textInputWithValidationSchema = yup.object().shape({
  [textInputName]: createStringValidationSchema({
    minLength: 1,
    maxLength: 5,
  }),
});

const textInputWithValidationFormConfig: UseFormProps = {
  resolver: yupResolver(textInputWithValidationSchema),
  mode: 'onTouched',
};
export const TextInputWithValidation: Story<InputControlProps> = (args) => (
  <InputComponent
    {...args}
    formConfig={textInputWithValidationFormConfig}
    placeholder={textInputPlaceholder}
    helperText={textHelperText}
    isRequired
  />
);

export const NumberInput: Story<InputControlProps> = (args) => (
  <InputComponent placeholder={numberInputPlaceholder} inputProps={{ type: 'number' }} {...args} />
);
NumberInput.args = {
  name: numberInputName,
  label: numberInputLabel,
};

export const DateInput: Story<InputControlProps> = (args) => (
  <InputComponent placeholder={textInputPlaceholder} inputProps={{ type: 'date' }} {...args} />
);
DateInput.args = {
  name: dateInputName,
  label: dateInputLabel,
};

export const TelInput: Story<InputControlProps> = (args) => (
  <InputComponent placeholder={textInputPlaceholder} inputProps={{ type: 'tel' }} {...args} />
);
TelInput.args = {
  name: telInputName,
  label: telInputLabel,
};
