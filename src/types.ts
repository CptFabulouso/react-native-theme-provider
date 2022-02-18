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
export type CombinedStyleObj<S extends Styles<S>, DS extends Styles<DS>> = S &
  DS;

export type ThemeContextValue<T extends Themes, DS extends Styles<DS>> = {
  selectedTheme: ExtractThemeNames<T>;
  themes: T;
  t: ExtractThemes<T>;
  defaultStyles: StyleObj<DS> | null;
};
export type ThemeDispatchContextValue<T extends Themes> = {
  setTheme: (t: ExtractThemeNames<T>) => void;
};

export interface ThemeContextProps<
  T extends Themes,
  DS extends Styles<DS> = never,
> {
  children: React.ReactNode;
  initialTheme: ExtractThemeNames<T>;
  defaultStylesCreator: DS extends undefined
    ? undefined
    : (theme: ExtractThemes<T>) => StyleObj<DS>;
  themes: T;
}

export interface StyleCreator<T extends Themes, P> {
  <S extends Styles<S>>(theme: ExtractThemes<T>, params: P): StyleObj<S>;
}
