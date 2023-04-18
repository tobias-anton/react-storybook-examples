import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Meta, Story } from '@storybook/react';
import { ReactNode } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { createStringValidationSchema } from '../../../../utils/formValidation';
import { InputControlProps } from '../InputControl';
import { PasswordControl, PasswordControlProps } from './index';

const passwordName = 'password';
const passwordLabel = 'Passwort';
const passwordHelperText = 'Mit deinem Passwort kannst du dich indentifizieren';
const passwordPlaceholder = 'Dein Passwort';

export default {
  title: 'components/shared/FormControl/PasswordControl',
  args: {
    name: passwordName,
    label: passwordLabel,
    placeholder: passwordPlaceholder,
  },
  argTypes: {
    name: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
  },
} as Meta;

type PasswordComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
} & Omit<InputControlProps, 'control'>;
const PasswordComponent: React.FC<PasswordComponentProps> = ({ formConfig, ...rest }) => {
  const { control } = useForm({ ...formConfig });

  return (
    <form>
      <PasswordControl control={control} {...rest} />
    </form>
  );
};

export const Default: Story<PasswordControlProps> = (args) => <PasswordComponent {...args} />;

export const Disabled: Story<PasswordControlProps> = (args) => <PasswordComponent isDisabled {...args} />;

export const WithHelperText: Story<PasswordControlProps> = (args) => (
  <PasswordComponent helperText={passwordHelperText} {...args} />
);

const withValidationSchema = yup.object().shape({
  [passwordName]: createStringValidationSchema({
    minLength: 1,
    maxLength: 20,
  }),
});

const withValidationFormConfig: UseFormProps = {
  resolver: yupResolver(withValidationSchema),
  mode: 'onTouched',
};
export const WithValidation: Story<PasswordControlProps> = (args) => (
  <PasswordComponent isRequired helperText={passwordHelperText} formConfig={withValidationFormConfig} {...args} />
);
