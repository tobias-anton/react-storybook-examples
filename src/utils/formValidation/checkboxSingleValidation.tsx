import * as Yup from 'yup';
import { RequiredSelectErrorMessage } from '../../components/shared/ErrorMessage';
import { NullableBooleanSchema } from './schema.types';

type CheckboxSingleSchemaErrorMessages = {
  requiredMessage?: () => React.ReactNode;
};

export type CreateCheckboxSingleSchemaOptions = {
  /** @default false */
  isOptional?: boolean | null;
  /** @default true */
  isNullable?: boolean | null;
  errorMessages?: CheckboxSingleSchemaErrorMessages;
};

export const createCheckboxSingleValidationSchema: (
  options: CreateCheckboxSingleSchemaOptions
) => NullableBooleanSchema = (options) => {
  const { isOptional = false, isNullable = false } = options;

  const errorMessages: CheckboxSingleSchemaErrorMessages = {
    requiredMessage: () => <RequiredSelectErrorMessage />,
    ...options.errorMessages,
  };

  let schema = isNullable ? Yup.boolean().nullable() : Yup.boolean();
  schema = isOptional ? schema : schema.oneOf([true], errorMessages.requiredMessage);
  return schema;
};
