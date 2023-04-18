import * as Yup from 'yup';
import {
  MaxValueErrorMessage,
  MinValueErrorMessage,
  RequiredErrorMessage,
  UnClearableErrorMessage,
} from '../../components/shared/ErrorMessage';
import { NullableNumberSchema } from './schema.types';

type NumberSchemaErrorMessages = {
  requiredMessage?: () => React.ReactNode;
  minValueMessage?: ({ min }: { min: number }) => React.ReactNode;
  maxValueMessage?: ({ max }: { max: number }) => React.ReactNode;
  unClearableMessage?: () => React.ReactNode;
};

export type CreateNumberSchemaOptions = {
  /** @default undefined */
  value?: number | null;
  /** @default false */
  isOptional?: boolean | null;
  /** @default true */
  isNullable?: boolean | null;
  /** @default undefined */
  minValue?: number | null;
  /** @default undefined */
  maxValue?: number | null;

  /**
   * Field can not be cleared once it has a stored non-empty value
   *
   * "OnceSet" is determined by supplied "empty-ness" of {@link value}
   *
   * @default false
   */
  isUnClearableOnceSet?: boolean | null;

  errorMessages?: NumberSchemaErrorMessages;
};
export const createNumberValidationSchema: (options: CreateNumberSchemaOptions) => NullableNumberSchema = (options) => {
  const {
    value: initialValue = undefined,
    isOptional = false,
    isNullable = true,
    minValue,
    maxValue,
    isUnClearableOnceSet = false,
  } = options;

  const errorMessages: NumberSchemaErrorMessages = {
    requiredMessage: () => <RequiredErrorMessage />,
    minValueMessage: ({ min }: { min: number }) => <MinValueErrorMessage min={min} />,
    maxValueMessage: ({ max }: { max: number }) => <MaxValueErrorMessage max={max} />,
    unClearableMessage: () => <UnClearableErrorMessage />,
    ...options.errorMessages,
  };

  const isClearable = !isUnClearableOnceSet || !initialValue;
  let schema = isClearable || isNullable ? Yup.number().nullable() : Yup.number();
  schema = isOptional ? schema : schema.required(errorMessages.requiredMessage);
  schema = isClearable ? schema : schema.required(errorMessages.unClearableMessage);
  schema = typeof minValue !== 'number' ? schema : schema.min(minValue, errorMessages.minValueMessage);
  schema = typeof maxValue !== 'number' ? schema : schema.max(maxValue, errorMessages.maxValueMessage);
  return schema;
};
