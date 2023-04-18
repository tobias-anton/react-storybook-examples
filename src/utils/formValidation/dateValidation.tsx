import * as Yup from 'yup';
import { MaxDateErrorMessage, MinDateErrorMessage, RequiredErrorMessage } from '../../components/shared/ErrorMessage';
import { NullableDateSchema } from './schema.types';

type DateSchemaErrorMessages = {
  requiredMessage?: () => React.ReactNode;
  minDateMessage?: ({ min }: { min: string | Date }) => React.ReactNode;
  maxDateMessage?: ({ max }: { max: string | Date }) => React.ReactNode;
};

export type CreateDateSchemaOptions = {
  /** @default false */
  isOptional?: boolean | null;
  /** @default true */
  isNullable?: boolean | null;
  /** @default undefined */
  minDate?: string | Date | null;
  /** @default undefined */
  maxDate?: string | Date | null;

  errorMessages?: DateSchemaErrorMessages;
};
export const createDateValidationSchema: (options: CreateDateSchemaOptions) => NullableDateSchema = (options) => {
  const { isOptional = false, isNullable = true, minDate, maxDate } = options;

  const errorMessages: DateSchemaErrorMessages = {
    requiredMessage: () => <RequiredErrorMessage />,
    minDateMessage: ({ min }) => <MinDateErrorMessage min={min} />,
    maxDateMessage: ({ max }) => <MaxDateErrorMessage max={max} />,
    ...options.errorMessages,
  };

  let schema = isNullable ? Yup.date().nullable() : Yup.date();
  schema = isOptional ? schema : schema.required(errorMessages.requiredMessage);
  schema = !(typeof minDate === 'string' || minDate instanceof Date)
    ? schema
    : schema.min(minDate, errorMessages.minDateMessage);
  schema = !(typeof maxDate === 'string' || maxDate instanceof Date)
    ? schema
    : schema.max(maxDate, errorMessages.maxDateMessage);
  return schema;
};
