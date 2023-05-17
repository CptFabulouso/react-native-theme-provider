import { StyleSheet } from 'react-native';

import { createThemedBaseStylesCreator, initThemeProvider } from '../creators';

type initialThemeParams = {
  fontSizeMultiplier: number;
};
export const themes = ({ fontSizeMultiplier }: initialThemeParams) => ({
  light: {
    colors: {
      primary: 'white',
    },
    typography: StyleSheet.create({
      h1: {
        fontSize: 32 * fontSizeMultiplier,
      },
    }),
  },
  dark: {
    colors: {
      primary: 'black',
    },
    typography: StyleSheet.create({
      h1: {
        fontSize: 20 * fontSizeMultiplier,
      },
    }),
  },
});

export const initialThemeParams: initialThemeParams = {
  fontSizeMultiplier: 1,
};

type Themes = typeof themes;

const baseStylesCreator = createThemedBaseStylesCreator<ReturnType<Themes>>()(
  (t) => ({
    page: {
      flex: 1,
      backgroundColor: t.colors.primary,
    },
    text: {
      color: t.colors.primary,
      fontSize: t.typography.h1.fontSize,
    },
  }),
);

export const {
  createUseStyle,
  createStyle,
  useTheme,
  useThemeDispatch,
  ThemeProvider,
  useStyle: useStyleThemed,
  useStyleWithParams: useStyleThemedWithParams,
} = initThemeProvider({
  themes,
  initialTheme: 'light',
  baseStylesCreator,
  initialThemeParams,
});
