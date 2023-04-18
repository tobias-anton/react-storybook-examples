import { Meta, Story } from '@storybook/react';

import { Icon, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ReactNode } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import { MdLanguage } from 'react-icons/md';
import * as yup from 'yup';
import { createSelectValidationSchema } from '../../../../utils/formValidation';
import { SelectControl, SelectControlProps } from './SelectControl';
import { SelectOptionList, SelectOptionListProps } from './SelectOptionList';

const optionListProps: SelectOptionListProps = {
  options: [
    { label: 'Albanien', value: 'Albanien' },
    { label: 'Andorra', value: 'Andorra' },
    { label: 'Belgien', value: 'Belgien' },
    { label: 'Bosnien-Herzegowina', value: 'Bosnien-Herzegowina' },
    { label: 'Bulgarien', value: 'Bulgarien' },
    { label: 'Dänemark', value: 'Dänemark' },
    { label: 'Deutschland', value: 'DE' },
    { label: 'Estland', value: 'Estland' },
    { label: 'Finnland', value: 'Finnland' },
    { label: 'Frankreich', value: 'Frankreich' },
    { label: 'Griechenland', value: 'Griechenland' },
    { label: 'Großbritannien und Nordirland', value: 'UK' },
    { label: 'Irland', value: 'Irland' },
    { label: 'Island', value: 'Island' },
    { label: 'Italien', value: 'Italien' },
    { label: 'Kosovo', value: 'Kosovo' },
    { label: 'Kroatien', value: 'Kroatien' },
    { label: 'Lettland', value: 'Lettland' },
    { label: 'Liechtenstein', value: 'Liechtenstein' },
    { label: 'Litauen', value: 'Litauen' },
    { label: 'Luxemburg', value: 'Luxemburg' },
    { label: 'Mazedonien', value: 'Mazedonien' },
    { label: 'Malta', value: 'Malta' },
    { label: 'Moldawien', value: 'Moldawien' },
    { label: 'Monaco', value: 'Monaco' },
    { label: 'Montenegro', value: 'Montenegro' },
    { label: 'Niederlande', value: 'Niederlande' },
    { label: 'Norwegen', value: 'Norwegen' },
    { label: 'Österreich', value: 'Österreich' },
    { label: 'Schweiz', value: 'Schweiz' },
  ],
};

const selectName = 'country';
const selectLabel = 'Land';
const selectPlaceholder = 'Wähle ein Land aus';
const selectHelperText = 'Das ausgewählte Land bestimmt deine Sprache!';

export default {
  title: 'components/shared/FormControl/Select',
  argTypes: {
    name: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    name: selectName,
    label: selectLabel,
  },
} as Meta;

type SelectComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
} & Omit<SelectControlProps, 'control'>;
const SelectComponent: React.FC<SelectComponentProps> = ({ formConfig, ...rest }) => {
  const { control } = useForm({ ...formConfig });

  return (
    <form>
      <SelectControl
        selectProps={{ placeholder: selectPlaceholder }}
        optionListProps={optionListProps}
        control={control}
        {...rest}
      />
    </form>
  );
};

type SelectWithLeftElementComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
} & Omit<SelectControlProps, 'control'>;
const SelectWithLeftElementComponent: React.FC<SelectWithLeftElementComponentProps> = ({ formConfig, ...rest }) => {
  const { control, register } = useForm({ ...formConfig });

  return (
    <form>
      <SelectControl
        selectProps={{ placeholder: selectPlaceholder }}
        optionListProps={optionListProps}
        control={control}
        {...rest}
      >
        <InputGroup>
          <InputLeftElement children={<Icon as={MdLanguage} />} />
          <Select
            placeholder={selectPlaceholder}
            children={<SelectOptionList {...optionListProps} />}
            sx={{ paddingInlineStart: 10 }}
            {...register(selectName)}
          />
        </InputGroup>
      </SelectControl>
    </form>
  );
};

export const Default: Story<SelectControlProps> = (args) => {
  return <SelectComponent {...args} />;
};

export const Preselected: Story<SelectControlProps> = (args) => {
  return <SelectComponent {...args} defaultValue={'Schweiz'} />;
};

export const Disabled: Story<SelectControlProps> = (args) => {
  return <SelectComponent {...args} isDisabled />;
};

export const WithHelperText: Story<SelectControlProps> = (args) => {
  return <SelectComponent {...args} formConfig={withValidationFormConfig} helperText={selectHelperText} />;
};

const withValidationSchema = yup.object().shape({
  [selectName]: createSelectValidationSchema({}),
});

const withValidationFormConfig: UseFormProps = {
  resolver: yupResolver(withValidationSchema),
  mode: 'onTouched',
};
export const WithValidation: Story<SelectControlProps> = (args) => {
  return <SelectComponent isRequired {...args} formConfig={withValidationFormConfig} helperText={selectHelperText} />;
};

const withLeftElementAndValidationSchema = yup.object().shape({
  [selectName]: createSelectValidationSchema({}),
});

const withLeftElementAndValidationConfig: UseFormProps = {
  resolver: yupResolver(withLeftElementAndValidationSchema),
  mode: 'onTouched',
};
export const WithLeftElementAndValidation: Story<SelectControlProps> = (args) => {
  return (
    <SelectWithLeftElementComponent
      {...args}
      formConfig={withLeftElementAndValidationConfig}
      helperText={selectHelperText}
      isRequired
    />
  );
};
