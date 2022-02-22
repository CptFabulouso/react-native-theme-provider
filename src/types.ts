import * as React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type Theme = Record<string, any>;
export type Themes = Record<string, Theme>;
export type ExtractThemeNames<T extends Themes> = keyof T;
export type ExtractThemes<T extends Themes> = T[keyof T];
export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export type Styles<S> = NamedStyles<S> | NamedStyles<any>;
export type StyleObj<S extends NamedStyles<S> | NamedStyles<any>> = S;

export type ThemeContextValue<T extends Themes> = {
  selectedTheme: ExtractThemeNames<T>;
  themes: T;
  t: ExtractThemes<T>;
};
export type ThemeDispatchContextValue<T extends Themes> = {
  setTheme: (t: ExtractThemeNames<T>) => void;
};

export type ThemeContextProps<T extends Themes> = {
  children: React.ReactNode;
  initialTheme: ExtractThemeNames<T>;
  onThemeChange?: (nextThemeName: ExtractThemeNames<T>) => void;
  themes: T;
};

export type StyleCreator<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P = undefined,
> = (theme: ExtractThemes<T>, params: P) => StyleObj<S>;

export type StyleCreatorCache<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P = undefined,
> = (creator: StyleCreator<T, S, P>) => StyleCreator<T, S, P>;
