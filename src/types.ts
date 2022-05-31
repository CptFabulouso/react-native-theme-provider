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

export type StyleCacheManager<
  T extends Themes,
  S extends Styles<S>,
  P = undefined,
> = {
  /**
    modify your cache if theme changes
  */
  onThemeChange: (themeName: keyof T) => void;
  /**
    Called for each style creator - function inside createStyle or createUseStyle.
    It receives the style creator and allows to return cached value instead of running the style creator again leading to styles recalculation.
  */
  onCacheStyleCreator: (
    styleCreator: StyleCreator<T, S, P>,
  ) => StyleCreator<T, S, P>;
};
