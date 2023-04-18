import * as Yup from 'yup';
import {
  EmailMalformedErrorMessage,
  MaxLengthErrorMessage,
  MinLengthErrorMessage,
  RequiredErrorMessage,
  UnClearableErrorMessage,
} from '../../components/shared/ErrorMessage';
import { NullableStringSchema } from './schema.types';

type StringSchemaErrorMessages = {
  requiredMessage?: () => React.ReactNode;
  emailMessage?: () => React.ReactNode;
  minLengthMessage?: ({ min }: { min: number }) => React.ReactNode;
  maxLengthMessage?: ({ max }: { max: number }) => React.ReactNode;
  unClearableMessage?: () => React.ReactNode;
};

export type CreateStringSchemaOptions = {
  /** @default undefined */
  value?: string | null;
  /** @default false */
  isOptional?: boolean | null;
  /** @default true */
  isNullable?: boolean | null;
  errorMessages?: StringSchemaErrorMessages;
  /** @default false */
  isEmail?: boolean | null;

  /** @default undefined */
  minLength?: number | null;

  /** @default undefined */
  maxLength?: number | null;

  /**
   * Field can not be cleared once it has a stored non-empty value
   *
   * "OnceSet" is determined by supplied "empty-ness" of {@link value}
   *
   * @default false
   */
  isUnClearableOnceSet?: boolean | null;
};

export const createStringValidationSchema: (options: CreateStringSchemaOptions) => NullableStringSchema = (options) => {
  const {
    value: initialValue = undefined,
    isOptional = false,
    isNullable = true,
    isEmail = false,
    minLength,
    maxLength,
    isUnClearableOnceSet = false,
  } = options;

  const errorMessages: StringSchemaErrorMessages = {
    requiredMessage: () => <RequiredErrorMessage />,
    emailMessage: () => <EmailMalformedErrorMessage />,
    minLengthMessage: ({ min }) => <MinLengthErrorMessage min={min} />,
    maxLengthMessage: ({ max }) => <MaxLengthErrorMessage max={max} />,
    unClearableMessage: () => <UnClearableErrorMessage />,
    ...options.errorMessages,
  };

  const isClearable = !isUnClearableOnceSet || !initialValue;
  let schema = isClearable || isNullable ? Yup.string().nullable() : Yup.string();
  schema = isOptional ? schema : schema.required(errorMessages.requiredMessage);
  schema = isClearable ? schema : schema.required(errorMessages.unClearableMessage);
  schema = typeof minLength !== 'number' ? schema : schema.min(minLength, errorMessages.minLengthMessage);
  schema = typeof maxLength !== 'number' ? schema : schema.max(maxLength, errorMessages.maxLengthMessage);
  if (isEmail) {
    schema = schema.email(errorMessages.emailMessage);
  }

  return schema;
};
