import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { mergeRefs } from '@chakra-ui/react-utils';
import { __DEV__ } from '@chakra-ui/utils';
import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import { BaseProps } from '../FormControl';

export type TextareaControlProps = BaseProps & {
  textareaProps?: TextareaProps;
  maxCharacterCount?: number;
};

export const TextareaControl: FC<TextareaControlProps> = React.forwardRef(
  (props: TextareaControlProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
    const {
      name,
      label,
      control,
      defaultValue = '',
      textareaProps,
      helperText,
      placeholder,
      maxCharacterCount,
      isReadOnly,
      isDisabled,
      ...rest
    } = props;

    const textareaRef = React.useRef<HTMLTextAreaElement>();

    const { field, fieldState, formState } = useController({
      name,
      control,
      defaultValue,
    });

    const isInvalid = !!fieldState.error && (fieldState.isTouched || formState.isSubmitted);

    React.useLayoutEffect(() => {
      const adjustTextareaHeight = () => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      };
      textareaRef.current?.addEventListener('input', adjustTextareaHeight);
      return () => {
        textareaRef.current?.removeEventListener('input', adjustTextareaHeight);
      };
    }, [textareaRef]);

    return (
      <FormControl isInvalid={isInvalid} isReadOnly={isReadOnly} isDisabled={isDisabled} {...rest} minH={'8.315rem'}>
        {label && <FormLabel>{label}</FormLabel>}
        <Textarea
          {...field}
          resize="none"
          overflow="hidden"
          placeholder={placeholder}
          {...textareaProps}
          ref={mergeRefs(ref, textareaRef)}
        />
        <Flex minH={4} mt={2} justifyContent={'space-between'}>
          <Box>
            {fieldState.error && <FormErrorMessage mt={0}>{fieldState.error?.message}</FormErrorMessage>}
            {helperText && !fieldState.error && <FormHelperText mt={0}>{helperText}</FormHelperText>}
          </Box>

          {maxCharacterCount && !isReadOnly && !isDisabled && (
            <Text textStyle={'captionXs'} ml={2}>
              {field?.value?.length ?? 0}/{maxCharacterCount}
            </Text>
          )}
        </Flex>
      </FormControl>
    );
  }
);

if (__DEV__) {
  TextareaControl.displayName = 'TextareaControl';
}

export default TextareaControl;
