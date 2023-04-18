import { yupResolver } from '@hookform/resolvers/yup';
import { Meta, Story } from '@storybook/react';
import { ReactNode } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { createNumberValidationSchema } from '../../../../utils/formValidation';
import { NumberInputControl, NumberInputControlProps } from './NumberInputControl';

const numberInputName = 'kwh';
const numberInputLabel = 'Strom in KWh';
const numberInputPlaceholder = 'Strom in KWh';
const numberHelperText = 'Gebe bitte deinen aktuellen Zählerstand in KWh an';

export default {
  title: 'components/shared/FormControl/NumberInput',
  args: {
    name: numberInputName,
    label: numberInputLabel,
    placeholder: numberInputPlaceholder,
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

type NumberInputComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
} & Omit<NumberInputControlProps, 'control'>;
const NumberInputComponent: React.FC<NumberInputComponentProps> = ({ formConfig, ...rest }) => {
  const { control } = useForm({ ...formConfig });

  return (
    <form>
      <NumberInputControl control={control} {...rest} />
    </form>
  );
};

export const Default: Story<NumberInputControlProps> = (args) => <NumberInputComponent {...args} />;

export const WithDefaultValue: Story<NumberInputControlProps> = (args) => (
  <NumberInputComponent defaultValue={'23'} {...args} />
);
export const WithStepper: Story<NumberInputControlProps> = (args) => (
  <NumberInputComponent showStepper={true} {...args} />
);

export const Disabled: Story<NumberInputControlProps> = (args) => (
  <NumberInputComponent isDisabled defaultValue={'2600'} {...args} />
);

export const WithHelperText: Story<NumberInputControlProps> = (args) => (
  <NumberInputComponent helperText={numberHelperText} {...args} />
);

const withValidationSchema = yup.object().shape({
  [numberInputName]: createNumberValidationSchema({
    minValue: 18,
    maxValue: 100,
  }),
});

const withValidationFormConfig: UseFormProps = {
  resolver: yupResolver(withValidationSchema),
  mode: 'onTouched',
};
export const WithValidation: Story<NumberInputControlProps> = (args) => (
  <NumberInputComponent isRequired helperText={numberHelperText} formConfig={withValidationFormConfig} {...args} />
);
