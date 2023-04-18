import { yupResolver } from '@hookform/resolvers/yup';
import { Meta, Story } from '@storybook/react';
import { ReactNode } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { createCheckboxSingleValidationSchema } from '../../../../../utils/formValidation';
import { InputControlProps } from '../../InputControl';
import { CheckboxSingleControl, CheckboxSingleControlProps } from './CheckboxSingleControl';

const checkboxName = 'acceptAGB';
const checkboxLabel = 'Ich akzeptiere die AGBs';
const checkboxHelperText = 'Die AGBs müssen aus Sicherheitsgründen akzeptiert werden';

export default {
  title: 'components/shared/FormControl/Checkbox/CheckboxSingle',
  argTypes: {
    name: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    name: checkboxName,
    label: checkboxLabel,
  },
} as Meta;

type CheckboxComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
} & Omit<InputControlProps, 'control'>;
const CheckboxComponent: React.FC<CheckboxComponentProps> = ({ formConfig, ...rest }) => {
  const { control } = useForm({ ...formConfig });

  return (
    <form>
      <CheckboxSingleControl control={control} {...rest} />
    </form>
  );
};

export const Default: Story<CheckboxSingleControlProps> = (args) => {
  return <CheckboxComponent {...args} />;
};

export const Disabled: Story<CheckboxSingleControlProps> = (args) => {
  return <CheckboxComponent {...args} isDisabled />;
};

export const Preselected: Story<CheckboxSingleControlProps> = (args) => {
  return <CheckboxComponent defaultValue={'true'} {...args} />;
};

export const WithHelperText: Story<CheckboxSingleControlProps> = (args) => {
  return <CheckboxComponent {...args} helperText={checkboxHelperText} />;
};

const withValidationSchema = yup.object().shape({
  [checkboxName]: createCheckboxSingleValidationSchema({}),
});

const withValidationFormConfig: UseFormProps = {
  resolver: yupResolver(withValidationSchema),
  mode: 'onTouched',
};
export const WithValidation: Story<InputControlProps> = (args) => (
  <CheckboxComponent {...args} formConfig={withValidationFormConfig} helperText={checkboxHelperText} />
);
