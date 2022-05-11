import {
  useStyle,
  initThemeProvider,
} from '@pavelgric/react-native-theme-provider';

import darkTheme from './variants/darkTheme';
import lightTheme from './variants/lightTheme';

export { useStyle };

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type Themes = typeof themes;

export const {
  createUseStyle,
  createStyle,
  useTheme,
  useThemeDispatch,
  ThemeProvider,
} = initThemeProvider({ themes, initialTheme: 'light' });
