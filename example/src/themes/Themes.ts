import {
  useStyle,
  initThemeProvider,
  createThemedBaseStylesCreator,
} from '@pavelgric/react-native-theme-provider';

import darkTheme from './variants/darkTheme';
import lightTheme from './variants/lightTheme';
import { ThemeParams } from './variants/themeCreator';

export { useStyle };

export type Themes = typeof themes;

export const themes = (params: ThemeParams) => ({
  light: lightTheme(params),
  dark: darkTheme(params),
});

export const baseStylesCreator = createThemedBaseStylesCreator<
  ReturnType<Themes>
>()((t) => ({
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
    backgroundColor: t.colors.surface,
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
  baseStylesKey: 'customBS',
  baseStylesCreator,
  initialThemeParams: {
    fontSizeMultiplier: 1,
  },
});
