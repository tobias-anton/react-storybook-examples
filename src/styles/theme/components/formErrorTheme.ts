import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({
  text: {
    fontSize: 'xs',
    fontWeight: 'normal',
    lineHeight: '4',
    letterSpacing: 'normal',
    mt: 2,
  },
});

export const formErrorTheme = defineStyleConfig({
  baseStyle,
});
