/* eslint-disable @typescript-eslint/naming-convention */
import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({
  fontWeight: 'semibold',
});

const sizes = defineStyle({
  '5xl': {
    fontSize: '5xl',
    lineHeight: '12',
  },
  '4xl': {
    fontSize: '4xl',
    lineHeight: '10',
  },
  '3xl': {
    fontSize: '3xl',
    lineHeight: '8',
  },
  '2xl': {
    fontSize: '2xl',
    lineHeight: '7',
  },
  xl: {
    fontSize: 'xl',
    lineHeight: '6',
  },
  lg: {
    fontSize: 'lg',
    lineHeight: '6',
  },
  md: {
    fontSize: 'md',
    lineHeight: '6',
  },
  sm: {
    fontSize: 'sm',
    lineHeight: '5',
  },
  xs: {
    fontSize: 'xs',
    lineHeight: '5',
  },
});

export const headingTheme = defineStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: '2xl',
  },
});
