import {
  useStyle,
  initThemeProvider,
  createThemedBaseStyles,
} from '@pavelgric/react-native-theme-provider';

import darkTheme from './variants/darkTheme';
import lightTheme from './variants/lightTheme';

export { useStyle };

export type BaseStyles = ReturnType<typeof baseStylesCreator>;
export type Themes = typeof themes;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const baseStylesCreator = createThemedBaseStyles<Themes>()((t) => ({
  page: {
    flex: 1,
    backgroundColor: t.colors.surface,
  },
  flex: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const {
  createUseStyle,
  createStyle,
  useTheme,
  useThemeDispatch,
  ThemeProvider,
} = initThemeProvider({
  themes,
  initialTheme: 'light',
  baseStylesCreator,
});
