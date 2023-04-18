import * as Yup from 'yup';
import { RequiredSelectErrorMessage } from '../../components/shared/ErrorMessage';
import { NullableMixedSchema } from './schema.types';

type SelectSchemaErrorMessages = {
  requiredMessage?: () => React.ReactNode;
};

export type CreateSelectSchemaOptions = {
  /** @default false */
  isOptional?: boolean | null;
  /** @default true */
  isNullable?: boolean | null;

  errorMessages?: SelectSchemaErrorMessages;
};
export const createSelectValidationSchema: (options: CreateSelectSchemaOptions) => NullableMixedSchema = (options) => {
  const { isOptional = false, isNullable = true } = options;

  const errorMessages: SelectSchemaErrorMessages = {
    requiredMessage: () => <RequiredSelectErrorMessage />,
    ...options.errorMessages,
  };

  let schema = isNullable ? Yup.mixed().nullable() : Yup.mixed();
  schema = schema.transform((value, originalValue) => {
    if (originalValue === '') {
      return null;
    }
    return value;
  });
  schema = isOptional ? schema : schema.required(errorMessages.requiredMessage);

  return schema;
};
