import {
  createThemeBag,
  useStyle,
} from '@pavelgric/react-native-theme-provider';

import darkTheme from './variants/darkTheme';
import lightTheme from './variants/lightTheme';

export { useStyle };

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type Themes = typeof themes;

const defStyles = {
  test: {
    backgroundColor: 'blue',
  },
};

export const {
  ThemeProvider,
  createUseStyle,
  createStyle,
  useTheme,
  useThemeDispatch,
} = createThemeBag<Themes>();
