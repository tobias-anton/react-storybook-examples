import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const sizes = defineStyle({
  md: {
    label: {
      fontSize: 'sm',
      fontWeight: 'normal',
      lineHeight: '5',
      letterSpacing: 'normal',
    },
    container: {
      h: 6,
    },
  },
});

export const radioTheme = defineStyleConfig({ sizes });
