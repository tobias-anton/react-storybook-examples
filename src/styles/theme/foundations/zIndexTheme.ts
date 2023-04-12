// Never change the values. Only those of the custom zInices may be changed.
// Changing the other values can lead to chakra's own components no longer functioning.

const customZIndices = {
  navigation: 1250,
};

const zIndexTheme = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
  ...customZIndices,
};

export default zIndexTheme;
