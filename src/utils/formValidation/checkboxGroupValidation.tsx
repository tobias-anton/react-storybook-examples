import * as Yup from 'yup';
import { MaxSelectOptionsErrorMessage, MinSelectOptionsErrorMessage } from '../../components/shared/ErrorMessage';
import { NullableArraySchema } from './schema.types';

type CheckboxGroupSchemaErrorMessages = {
  requiredMessage?: ({ min }: { min: number }) => React.ReactNode;
  minSelectOptionsMessage?: ({ min }: { min: number }) => React.ReactNode;
  maxSelectOptionsMessage?: ({ max }: { max: number }) => React.ReactNode;
};

export type CreateCheckboxGroupSchemaOptions = {
  /** @default false */
  isOptional?: boolean | null;
  /** @default true */
  isNullable?: boolean | null;
  /** @default undefined */
  minSelect?: number | null;
  /** @default undefined */
  maxSelect?: number | null;
  errorMessages?: CheckboxGroupSchemaErrorMessages;
};

export const createCheckboxGroupValidationSchema: (options: CreateCheckboxGroupSchemaOptions) => NullableArraySchema = (
  options
) => {
  const { isOptional = false, isNullable = false, minSelect, maxSelect } = options;

  const errorMessages: CheckboxGroupSchemaErrorMessages = {
    requiredMessage: ({ min = minSelect ?? 1 }) => <MinSelectOptionsErrorMessage min={min} />,
    minSelectOptionsMessage: ({ min }) => <MinSelectOptionsErrorMessage min={min} />,
    maxSelectOptionsMessage: ({ max }) => <MaxSelectOptionsErrorMessage max={max} />,
    ...options.errorMessages,
  };

  let schema = isNullable ? Yup.array().nullable() : Yup.array();
  schema = isOptional
    ? schema
    : schema.required(errorMessages.requiredMessage).min(minSelect ?? 1, errorMessages.requiredMessage);
  schema = schema.transform((value, originalValue) => {
    if (originalValue === '') {
      return null;
    }
    return value;
  });
  schema = !minSelect ? schema : schema.min(minSelect, errorMessages.minSelectOptionsMessage);
  schema = !maxSelect ? schema : schema.max(maxSelect, errorMessages.maxSelectOptionsMessage);
  return schema;
};
