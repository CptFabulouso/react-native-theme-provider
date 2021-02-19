import * as React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type Theme = Record<string, any>;
export type Themes = Record<string, Theme>;
export type ExtractThemeNames<T extends Themes> = keyof T;
export type ExtractThemes<T extends Themes> = T[keyof T];
export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

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
  themes: T;
};

export type StyleCreator<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>
> = (themes: ExtractThemes<T>) => StyleObj<S>;

export type StyleCreatorWithParams<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P = any
> = (themes: ExtractThemes<T>, params: P) => StyleObj<S>;

export interface UseStyle<T extends Themes> {
  <S extends NamedStyles<S> | NamedStyles<any>>(
    styleCreator: StyleCreator<T, S>,
  ): StyleObj<S>;

  <S extends NamedStyles<S> | NamedStyles<any>, P = any>(
    styleCreator: StyleCreatorWithParams<T, S, P>,
    params: P,
  ): StyleObj<S>;
}

export interface CreateStyle<T extends Themes> {
  <S extends NamedStyles<S> | NamedStyles<any>>(
    styleCreator: StyleCreator<T, S>,
  ): StyleCreator<T, S>;

  <S extends NamedStyles<S> | NamedStyles<any>, P>(
    styleCreator: StyleCreatorWithParams<T, S, P>,
  ): StyleCreatorWithParams<T, S, P>;
}

export interface CreateUseStyle<T extends Themes> {
  <S extends NamedStyles<S> | NamedStyles<any>>(
    styleCreator: StyleCreator<T, S>,
  ): () => StyleObj<S>;

  <S extends NamedStyles<S> | NamedStyles<any>, P = any>(
    styleCreator: StyleCreatorWithParams<T, S, P>,
  ): (params: P) => StyleObj<S>;
}
