import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({
  fontSize: 'md',
  fontWeight: 'semibold',
  lineHeight: '5',
  letterSpacing: 'normal',
  mb: 2,
});

export const formLabelTheme = defineStyleConfig({
  baseStyle,
});
