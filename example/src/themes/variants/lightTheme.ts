import { createTheme } from './themeCreator';
import { pallete } from '../res/colors';

export const lightTheme = createTheme({
  colors: {
    primary: pallete['blue-ribbon'],
    secondary: pallete['school-bus-yellow'],
    surface: pallete.white,
    onPrimary: pallete.white,
    onSecondary: pallete.black,
    onSurface: pallete.black,
    primaryVariant: pallete.cobalt,
    secondaryVariant: pallete.amber,
    error: pallete.monza,
  },
});
