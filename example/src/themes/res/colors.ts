export const pallete = {
  'blue-ribbon': '#0336ff',
  'school-bus-yellow': '#ffde03',
  white: '#ffffff',
  black: '#000000',
  cobalt: '#0035c9',
  amber: '#ffc000',
  monza: '#b00020',
};

export type ColorPallete = typeof pallete;

export const Colors = {
  primary: pallete['blue-ribbon'],
  secondary: pallete['school-bus-yellow'],
  surface: pallete.white,
  onPrimary: pallete.white,
  onSecondary: pallete.black,
  onSurface: pallete.black,
  primaryVariant: pallete.cobalt,
  secondaryVariant: pallete.amber,
  error: pallete.monza,
};
