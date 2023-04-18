import { Meta, Story } from '@storybook/react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ReactNode } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { createMultiSelectValidationSchema, createSelectValidationSchema } from '../../../../utils/formValidation';
import { ReactSelectControl, ReactSelectControlProps, ReactSelectOptions } from './ReactSelectControl';

const options: ReactSelectOptions = [
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
];

const groupedOptions: ReactSelectOptions = [
  {
    label: 'Sorted',
    options: [
      { label: 'Albanien', value: 'Albanien' },
      { label: 'Andorra', value: 'Andorra' },
      { label: 'Belgien', value: 'Belgien' },
      { label: 'Bosnien-Herzegowina', value: 'Bosnien-Herzegowina' },
      { label: 'Bulgarien', value: 'Bulgarien' },
      { label: 'Dänemark', value: 'Dänemark' },
      { label: 'Deutschland', value: 'DE' },
    ],
  },
  {
    label: 'Unsorted',
    options: [
      { label: 'Italien', value: 'Italien' },
      { label: 'Kosovo', value: 'Kosovo' },
      { label: 'Kroatien', value: 'Kroatien' },
      { label: 'Lettland', value: 'Lettland' },
      { label: 'Liechtenstein', value: 'Liechtenstein' },
      { label: 'Litauen', value: 'Litauen' },
      { label: 'Luxemburg', value: 'Luxemburg' },
      { label: 'Mazedonien', value: 'Mazedonien' },
      { label: 'Malta', value: 'Malta' },
    ],
  },
];

const selectName = 'country';
const selectLabel = 'Land';
const selectPlaceholder = 'Wähle ein Land aus';
const selectHelperText = 'Das ausgewählte Land bestimmt deine Sprache!';

export default {
  title: 'components/shared/FormControl/ReactSelect',
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

type ReactSelectComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
} & Omit<ReactSelectControlProps, 'control'>;
const ReactSelectComponent: React.FC<ReactSelectComponentProps> = ({ formConfig, ...rest }) => {
  const { control } = useForm({ ...formConfig });

  return (
    <form>
      <ReactSelectControl control={control} {...rest} />
    </form>
  );
};

export const Default: Story<ReactSelectControlProps> = (args) => {
  return <ReactSelectComponent reactSelectProps={{ options, placeholder: selectPlaceholder }} {...args} />;
};

export const PreSelected: Story<ReactSelectControlProps> = (args) => {
  return (
    <ReactSelectComponent
      defaultValue={'Italien'}
      reactSelectProps={{ options, placeholder: selectPlaceholder }}
      {...args}
    />
  );
};

export const GroupedOptions: Story<ReactSelectControlProps> = (args) => {
  return (
    <ReactSelectComponent
      reactSelectProps={{
        options: groupedOptions,
        placeholder: selectPlaceholder,
      }}
      {...args}
    />
  );
};

export const MultiSelect: Story<ReactSelectControlProps> = (args) => {
  return (
    <ReactSelectComponent
      reactSelectProps={{
        options,
        placeholder: selectPlaceholder,
        isMulti: true,
      }}
      {...args}
    />
  );
};

export const MultiSelectPreSelected: Story<ReactSelectControlProps> = (args) => {
  return (
    <ReactSelectComponent
      defaultValue={['Schweiz', 'Malta']}
      reactSelectProps={{
        options,
        placeholder: selectPlaceholder,
        isMulti: true,
      }}
      {...args}
    />
  );
};

export const WithHelperText: Story<ReactSelectControlProps> = (args) => {
  return (
    <ReactSelectComponent
      helperText={selectHelperText}
      reactSelectProps={{ options, placeholder: selectPlaceholder }}
      {...args}
    />
  );
};

const withValidationSchema = yup.object().shape({
  [selectName]: createSelectValidationSchema({}),
});

const withValidationFormConfig: UseFormProps = {
  resolver: yupResolver(withValidationSchema),
  mode: 'onTouched',
};
export const WithValidation: Story<ReactSelectComponentProps> = (args) => {
  return (
    <ReactSelectComponent
      isRequired
      formConfig={withValidationFormConfig}
      reactSelectProps={{
        options,
        placeholder: selectPlaceholder,
      }}
      helperText={selectHelperText}
      {...args}
    />
  );
};

const multiSelectWithValidationSchema = yup.object().shape({
  [selectName]: createMultiSelectValidationSchema({
    minSelect: 3,
    maxSelect: 4,
  }),
});

const multiSelectWithValidationFormConfig: UseFormProps = {
  resolver: yupResolver(multiSelectWithValidationSchema),
  mode: 'onTouched',
};
export const MultiSelectWithValidation: Story<ReactSelectComponentProps> = (args) => {
  return (
    <ReactSelectComponent
      isRequired
      formConfig={multiSelectWithValidationFormConfig}
      reactSelectProps={{
        options,
        isMulti: true,
        placeholder: selectPlaceholder,
      }}
      helperText={selectHelperText}
      {...args}
    />
  );
};

export const Clearable: Story<ReactSelectComponentProps> = (args) => {
  return (
    <ReactSelectComponent
      formConfig={withValidationFormConfig}
      reactSelectProps={{
        options,
        placeholder: selectPlaceholder,
        isClearable: true,
      }}
      helperText={selectHelperText}
      {...args}
    />
  );
};
