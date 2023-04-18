import { useTranslation } from 'react-i18next';

/**
 * This component is needed so that error messages can be restyled more easily afterwards. Leading icons or other
 * adjustments can be made afterwards without having to change all error messages.
 * @example Using a custom icon, make it yourself with:
 *  import { FormErrorIcon } from '@chakra-ui/react';
 *  // ...
 *  <>
 *     <FormErrorIcon as={CustomIcon} />
 *     {text}
 *  </>
 */

export const ErrorMessage: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => <>{children}</>;

/**
 * Required error messages
 * */
export const RequiredErrorMessage = () => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.PleaseFillIn')} />;
};

export const RequiredSelectErrorMessage = () => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.PleaseSelect')} />;
};

export const RequiredWithLabelReferenceErrorMessage: React.FC<{
  labeled: string;
}> = ({ labeled }) => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.PleaseFillInLabeled', { labeled })} />;
};

export const RequiredUploadErrorMessage = () => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.PleaseUpload')} />;
};

/**
 * Min error messages
 * */

export const MinLengthErrorMessage: React.FC<{ min: number }> = ({ min }) => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.UseAtLeastMinCharacters', { min })} />;
};

export const MinValueErrorMessage: React.FC<{ min: number }> = ({ min }) => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.MustNotFallBelowMin', { min })} />;
};

export const MinDateErrorMessage: React.FC<{ min: string | Date }> = ({ min }) => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.MustNotFallBelowMin', { min })} />;
};

export const MinSelectOptionsErrorMessage: React.FC<{ min: number }> = ({ min }) => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.PleaseSelectAtLeastOptions', { count: min })} />;
};

/**
 * Max error messages
 * */

export const MaxSelectOptionsErrorMessage: React.FC<{ max: number }> = ({ max }) => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.PleaseSelectAMaximumOfOptions', { max })} />;
};

export const MaxLengthErrorMessage: React.FC<{ max: number }> = ({ max }) => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.UseMaximumMaxCharacters', { max })} />;
};

export const MaxValueErrorMessage: React.FC<{ max: number }> = ({ max }) => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.MustNotExceedMax', { max })} />;
};

export const MaxDateErrorMessage: React.FC<{ max: string | Date }> = ({ max }) => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.MustNotExceedMax', { max })} />;
};

export const EmailMalformedErrorMessage: React.FC = () => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.EmailFormattingUnknown')} />;
};

export const UnClearableErrorMessage: React.FC = () => {
  const { t } = useTranslation(['general']);
  return <ErrorMessage children={t('general:error.MustBeFilledIn')} />;
};
