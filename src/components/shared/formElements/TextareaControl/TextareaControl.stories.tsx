/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Meta, Story } from '@storybook/react';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { ReactNode } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { createStringValidationSchema } from '../../../../utils/formValidation';
import { TextareaControl, TextareaControlProps } from './TextareaControl';

const textareaName = 'feedback';
const textareaLabel = 'Dein Feedback zu unserem Service';
const textareaPlaceholder = 'Gebe dein Feedback ein';
const textareaHelperText = 'Dein Feedback ist uns wichtig um uns zu verbessern!';

export default {
  title: 'components/shared/FormControl/Textarea',
  args: {
    name: textareaName,
    label: textareaLabel,
    placeholder: textareaPlaceholder,
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

type TextareaComponentProps = {
  formConfig?: Partial<UseFormProps>;
  children?: ReactNode;
} & Omit<TextareaControlProps, 'control'>;
const TextareaComponent: React.FC<TextareaComponentProps> = ({ formConfig, ...rest }) => {
  const { control } = useForm({ ...formConfig });

  return (
    <form>
      <TextareaControl control={control} {...rest} />
    </form>
  );
};

export const Default: Story<TextareaControlProps> = (args) => (
  <TextareaComponent
    maxCharacterCount={20}
    textareaProps={{
      autoComplete: 'off',
    }}
    {...args}
  />
);

export const Disabled: Story<TextareaControlProps> = (args) => (
  <>
    <TextareaComponent
      maxCharacterCount={20}
      textareaProps={{
        autoComplete: 'off',
      }}
      isDisabled={true}
      {...args}
    />
  </>
);

export const Readonly: Story<TextareaControlProps> = (args) => (
  <>
    <TextareaComponent
      defaultValue={'Mein Feedback zu euch!'}
      isReadOnly
      maxCharacterCount={20}
      textareaProps={{
        autoComplete: 'off',
      }}
      {...args}
    />
  </>
);

const withValidationSchema = yup.object().shape({
  [textareaName]: createStringValidationSchema({
    minLength: 1,
    maxLength: 50,
  }),
});

const withValidationFormConfig: UseFormProps = {
  resolver: yupResolver(withValidationSchema),
  mode: 'onTouched',
};

export const WithValidation: Story<TextareaControlProps> = (args) => (
  <>
    <TextareaComponent
      isRequired
      helperText={textareaHelperText}
      maxCharacterCount={50}
      textareaProps={{
        autoComplete: 'off',
      }}
      formConfig={withValidationFormConfig}
      {...args}
    />
  </>
);
