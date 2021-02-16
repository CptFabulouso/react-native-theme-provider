import { createTheme } from './themeCreator';
import { pallete } from '../res/colors';

export default createTheme({
  colors: {
    primary: pallete['school-bus-yellow'],
    secondary: pallete['blue-ribbon'],
    surface: pallete.black,
    onPrimary: pallete.black,
    onSecondary: pallete.white,
    onSurface: pallete.white,
    primaryVariant: pallete.amber,
    secondaryVariant: pallete.cobalt,
    error: pallete.monza,
  },
});
