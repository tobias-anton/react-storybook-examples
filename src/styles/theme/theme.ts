import { extendTheme, theme as defaultTheme } from '@chakra-ui/react';
import { formErrorTheme, formLabelTheme, formTheme, headingTheme, radioTheme } from './components';
import {
  colorTheme,
  fontSizeTheme,
  fontWeightTheme,
  letterSpacingTheme,
  lineHeightTheme,
  textStyleTheme,
} from './foundations';
import zIndexTheme from './foundations/zIndexTheme';

export const theme = extendTheme({
  ...defaultTheme,
  // Foundations
  colors: { ...colorTheme },
  fontWeights: { ...fontWeightTheme },
  fontSizes: { ...fontSizeTheme },
  letterSpacings: { ...letterSpacingTheme },
  lineHeights: { ...lineHeightTheme },
  textStyles: { ...textStyleTheme },
  zIndices: { ...zIndexTheme },
  styles: {
    global: {
      body: {
        color: 'fontColor.700',
        fontSize: 'sm',
        fontWeight: 'normal',
        lineHeight: '5',
        letterSpacing: 'normal',
      },
    },
  },
  fonts: {
    heading: `Inter, ${defaultTheme.fonts?.heading}`,
    body: `Inter, ${defaultTheme.fonts?.body}`,
  },
  components: {
    Heading: headingTheme,
    FormLabel: formLabelTheme,
    FormError: formErrorTheme,
    Form: formTheme,
    Radio: radioTheme,
  },
});
