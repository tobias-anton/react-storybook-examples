import * as Yup from 'yup';
import { RequiredSelectErrorMessage } from '../../components/shared/ErrorMessage';
import { NullableStringSchema } from './schema.types';

type RadioSchemaErrorMessages = {
  requiredMessage?: () => React.ReactNode;
};

export type CreateRadioSchemaOptions = {
  /** @default false */
  isOptional?: boolean | null;
  /** @default true */
  isNullable?: boolean | null;
  errorMessages?: RadioSchemaErrorMessages;
};

export const createRadioValidationSchema: (options: CreateRadioSchemaOptions) => NullableStringSchema = (options) => {
  const { isOptional = false, isNullable = false } = options;

  const errorMessages: RadioSchemaErrorMessages = {
    requiredMessage: () => <RequiredSelectErrorMessage />,
    ...options.errorMessages,
  };

  let schema = isNullable ? Yup.string().nullable() : Yup.string();
  schema = isOptional ? schema : schema.required(errorMessages.requiredMessage);
  return schema;
};
