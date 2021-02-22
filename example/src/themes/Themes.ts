import {
  createThemedStyleCreator,
  createThemedUseStyleCreator,
  createUseTheme,
  createUseThemeDispatch,
  useStyle,
} from '@pavelgric/react-native-theme-provider';

export { useStyle };

import darkTheme from './variants/darkTheme';
import lightTheme from './variants/lightTheme';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type Themes = typeof themes;

export const createUseStyle = createThemedUseStyleCreator<Themes>();
export const createStyle = createThemedStyleCreator<Themes>();
export const useTheme = createUseTheme<Themes>();
export const useThemeDispatch = createUseThemeDispatch<Themes>();
