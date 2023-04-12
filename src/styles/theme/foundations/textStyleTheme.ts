/**
 * The naming of the font tokens is composed as follows:
 * Purpose + FontSize + FontWeight(If there are more than two)
 */

const subtitleTextStyleTheme = {
  subtitleSmSb: {
    fontSize: 'sm',
    fontWeight: 'semibold',
    lineHeight: '4',
    letterSpacing: 'normal',
  },
  subtitleMdSb: {
    fontSize: 'md',
    fontWeight: 'semibold',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
  subtitleLgSb: {
    fontSize: 'lg',
    fontWeight: 'semibold',
    lineHeight: '6',
    letterSpacing: 'normal',
  },
  subtitleXlSb: {
    fontSize: 'xl',
    fontWeight: 'semibold',
    lineHeight: '6',
    letterSpacing: 'normal',
  },
};

const bodyTextStyleTheme = {
  bodySm: {
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
  bodyMd: {
    fontSize: 'md',
    fontWeight: 'normal',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
  bodySmSb: {
    fontSize: 'sm',
    fontWeight: 'semibold',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
  bodyMdSb: {
    fontSize: 'md',
    fontWeight: 'semibold',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
};

const buttonTextStyleTheme = {
  buttonSmSb: {
    fontSize: 'sm',
    fontWeight: 'semibold',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
  buttonMdSb: {
    fontSize: 'md',
    fontWeight: 'semibold',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
};

const linkTextStyleTheme = {
  linkXsSb: {
    fontSize: 'xs',
    fontWeight: 'semibold',
    lineHeight: '4',
    letterSpacing: 'normal',
  },
  linkXs: {
    fontSize: 'xs',
    fontWeight: 'normal',
    lineHeight: '4',
    letterSpacing: 'normal',
  },
  linkSmSb: {
    fontSize: 'sm',
    fontWeight: 'semibold',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
  linkSm: {
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
};

const labelTextStyleTheme = {
  labelSm: {
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
  labelSmSb: {
    fontSize: 'sm',
    fontWeight: 'semibold',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
  labelLg: {
    fontSize: 'lg',
    fontWeight: 'normal',
    lineHeight: '6',
    letterSpacing: 'normal',
  },
  labelMdSb: {
    fontSize: 'md',
    fontWeight: 'semibold',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
};

const captionTextStyleTheme = {
  captionXs: {
    fontSize: 'xs',
    fontWeight: 'normal',
    lineHeight: '4',
    letterSpacing: 'normal',
  },
};

const inputTextStyleTheme = {
  inputMd: {
    fontSize: 'md',
    fontWeight: 'normal',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
  input3Xl: {
    fontSize: '3xl',
    fontWeight: 'normal',
    lineHeight: '8',
    letterSpacing: 'normal',
  },
};

const itemTextStyleTheme = {
  itemMd: {
    fontSize: 'md',
    fontWeight: 'normal',
    lineHeight: '5',
    letterSpacing: 'normal',
  },
  itemLg: {
    fontSize: 'lg',
    fontWeight: 'normal',
    lineHeight: '6',
    letterSpacing: 'normal',
  },
  itemLgSb: {
    fontSize: 'lg',
    fontWeight: 'semibold',
    lineHeight: '6',
    letterSpacing: 'normal',
  },
};

const navigationTextStyleTheme = {
  navigation3xlSb: {
    fontSize: '3xl',
    fontWeight: 'semibold',
    lineHeight: '8',
    letterSpacing: 'normal',
  },
  navigation2xlMd: {
    fontSize: '2xl',
    fontWeight: 'medium',
    lineHeight: '7',
    letterSpacing: 'normal',
  },
  navigationXlMd: {
    fontSize: 'xl',
    fontWeight: 'medium',
    lineHeight: '6',
    letterSpacing: 'normal',
  },
  navigationXlSb: {
    fontSize: 'xl',
    fontWeight: 'semibold',
    lineHeight: '6',
    letterSpacing: 'normal',
  },
};

export const textStyleTheme = {
  ...subtitleTextStyleTheme,
  ...bodyTextStyleTheme,
  ...buttonTextStyleTheme,
  ...linkTextStyleTheme,
  ...labelTextStyleTheme,
  ...captionTextStyleTheme,
  ...inputTextStyleTheme,
  ...itemTextStyleTheme,
  ...navigationTextStyleTheme,
};
