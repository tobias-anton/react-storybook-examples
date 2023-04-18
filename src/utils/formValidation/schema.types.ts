/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AnyObject, ArraySchema, BooleanSchema, DateSchema, MixedSchema, NumberSchema, StringSchema } from 'yup';

type MaybeString = string | null | undefined;
export type NullableStringSchema = StringSchema<MaybeString, AnyObject, MaybeString>;

type MaybeNumber = number | null | undefined;
export type NullableNumberSchema = NumberSchema<MaybeNumber, AnyObject, MaybeNumber>;

type MaybeDate = Date | null | undefined;
export type NullableDateSchema = DateSchema<MaybeDate, AnyObject, MaybeDate>;

type MaybeBoolean = boolean | null | undefined;
export type NullableBooleanSchema = BooleanSchema<MaybeBoolean, AnyObject, MaybeBoolean>;

type MaybeArray = any | null | undefined;
export type NullableArraySchema = ArraySchema<MaybeArray, AnyObject, MaybeArray>;

type MaybeMixed = any | null | undefined;
export type NullableMixedSchema = MixedSchema<MaybeMixed, AnyObject, MaybeMixed>;
