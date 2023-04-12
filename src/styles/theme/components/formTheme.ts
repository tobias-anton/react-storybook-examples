import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({
  helperText: {
    fontSize: 'xs',
    fontWeight: 'normal',
    lineHeight: '4',
    letterSpacing: 'normal',
    mt: 2,
  },
});

export const formTheme = defineStyleConfig({
  baseStyle,
});
