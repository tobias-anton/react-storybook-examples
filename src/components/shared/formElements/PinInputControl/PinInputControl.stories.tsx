import { Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Meta, Story } from '@storybook/react';
import { ReactNode } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { createStringValidationSchema } from '../../../../utils/formValidation';
import { PinInputControl, PinInputControlProps } from './PinInputControl';

const pinInputName = 'pin';
const PinInputLabel = 'Dein Pin';
const pinHelperText = 'Anhand deines Pins wissen wird, ob du es bist!';

export default {
  title: 'components/shared/FormControl/PinInput',
  args: {
    name: pinInputName,
    label: PinInputLabel,
    pinAmount: 4,
  },
  argTypes: {
    name: {
      control: 'text',
    },
    label: {
      control: 'text',
    },

    pinAmount: {
      control: 'number',
    },
  },
} as Meta;

type PinInputComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
  withSubmitButton?: boolean;
} & Omit<PinInputControlProps, 'control'>;
const PinInputComponent: React.FC<PinInputComponentProps> = ({ formConfig, withSubmitButton, ...rest }) => {
  const { control, getValues, handleSubmit } = useForm({ ...formConfig });

  return (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log(data);
      })}
    >
      <PinInputControl control={control} {...rest} />
      {withSubmitButton && (
        <Button type={'submit'} mt={4}>
          Submit
        </Button>
      )}
    </form>
  );
};

export const Default: Story<PinInputControlProps> = (args) => <PinInputComponent {...args} />;

export const WithHelperText: Story<PinInputControlProps> = (args) => (
  <PinInputComponent helperText={pinHelperText} {...args} />
);

const pinInputWithValidationSchema = yup.object().shape({
  [pinInputName]: createStringValidationSchema({
    minLength: 4,
  }),
});

const pinInputWithValidationFormConfig: UseFormProps = {
  resolver: yupResolver(pinInputWithValidationSchema),
  mode: 'onTouched',
};

export const WithValidation: Story<PinInputControlProps> = (args) => (
  <PinInputComponent
    isRequired
    formConfig={pinInputWithValidationFormConfig}
    helperText={pinHelperText}
    withSubmitButton
    {...args}
  />
);
