import { Divider, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Meta, Story } from '@storybook/react';
import { ReactNode } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as Yup from 'yup';
import { createCheckboxGroupValidationSchema } from '../../../../../utils/formValidation';
import {
  CheckboxGroupControl,
  CheckboxGroupControlContainer,
  CheckboxGroupControlContainerProps,
} from './CheckboxGroupControl';

const checkboxGroupName = 'months';
const checkboxHelperText = 'Der ausgewählte Monat bezieht sich auf den Abrechnungszeitpunk';

const checkboxLabelJanuary = 'Januar';
const checkboxValueJanuary = 'january';

const checkboxLabelFebruary = 'Februar';
const checkboxValueFebruary = 'february';

const checkboxLabelMarch = 'März';
const checkboxValueMarch = 'march';
const checkboxGroupLabel = 'Wähle die Monate aus, deren Rechnungen du sehen willst';

export default {
  title: 'components/shared/FormControl/Checkbox/CheckboxGroup',
  argTypes: {
    name: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    name: checkboxGroupName,
    label: checkboxGroupLabel,
  },
} as Meta;

type CheckboxGroupComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
} & Omit<CheckboxGroupControlContainerProps, 'control'>;
const CheckboxGroupComponent: React.FC<CheckboxGroupComponentProps> = ({ formConfig, ...rest }) => {
  const { control } = useForm({ ...formConfig });

  return (
    <form>
      <CheckboxGroupControlContainer control={control} {...rest}>
        <VStack spacing={2} alignItems={'start'}>
          <CheckboxGroupControl value={checkboxValueJanuary} label={checkboxLabelJanuary} />

          <Divider />
          <CheckboxGroupControl value={checkboxValueFebruary} label={checkboxLabelFebruary} />

          <Divider />
          <CheckboxGroupControl value={checkboxValueMarch} label={checkboxLabelMarch} />
        </VStack>
      </CheckboxGroupControlContainer>
    </form>
  );
};

type SomeDisabledComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
} & Omit<CheckboxGroupControlContainerProps, 'control'>;
const SomeDisabledComponent: React.FC<CheckboxGroupComponentProps> = ({ formConfig, ...rest }) => {
  const { control } = useForm({ ...formConfig });

  return (
    <form>
      <CheckboxGroupControlContainer control={control} {...rest}>
        <VStack spacing={2} alignItems={'start'}>
          <CheckboxGroupControl value={checkboxValueJanuary} label={checkboxLabelJanuary} isDisabled />

          <Divider />
          <CheckboxGroupControl value={checkboxValueFebruary} label={checkboxLabelFebruary} />

          <Divider />
          <CheckboxGroupControl value={checkboxValueMarch} label={checkboxLabelMarch} />
        </VStack>
      </CheckboxGroupControlContainer>
    </form>
  );
};

export const Default: Story<CheckboxGroupControlContainerProps> = (args) => {
  return <CheckboxGroupComponent {...args} />;
};

export const AllDisabled: Story<CheckboxGroupControlContainerProps> = (args) => {
  return <CheckboxGroupComponent isDisabled {...args} />;
};

export const SomeDisabled: Story<CheckboxGroupControlContainerProps> = (args) => {
  return <SomeDisabledComponent {...args} />;
};

export const Preselected: Story<CheckboxGroupControlContainerProps> = (args) => {
  return <CheckboxGroupComponent defaultValues={[checkboxValueMarch, checkboxValueJanuary]} {...args} />;
};

export const WithHelperText: Story<CheckboxGroupControlContainerProps> = (args) => {
  return <CheckboxGroupComponent helperText={checkboxHelperText} {...args} />;
};

const withValidationSchema = Yup.object().shape({
  [checkboxGroupName]: createCheckboxGroupValidationSchema({}),
});

const withValidationFormConfig: UseFormProps = {
  resolver: yupResolver(withValidationSchema),
  mode: 'onTouched',
};
export const WithValidation: Story<CheckboxGroupControlContainerProps> = (args) => {
  return (
    <CheckboxGroupComponent
      helperText={checkboxHelperText}
      formConfig={withValidationFormConfig}
      isRequired
      {...args}
    />
  );
};
