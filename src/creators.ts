import React from 'react';

import { ThemeProvider } from './ThemeContext';
import { useCachedStyle, useStyle, useTheme, useThemeDispatch } from './hooks';
import { KeyGenerator } from './stylesCache';
import {
  Styles,
  StyleCreator,
  CombinedStyleObj,
  StyleObj,
  ThemeContextProps,
  Themes,
} from './types';

export function createUseTheme<T extends Themes, DS extends Styles<DS>>() {
  return function () {
    return useTheme<T, DS>();
  };
}

export function createUseThemeDispatch<T extends Themes>() {
  return function () {
    return useThemeDispatch<T>();
  };
}

export function createStyle<T extends Themes>(
  fn: StyleCreator<T, undefined>,
): StyleCreator<T, undefined>;

export function createStyle<T extends Themes, S extends Styles<S>, P>(
  fn: StyleCreator<T, P>,
): StyleCreator<T, P>;

export function createStyle<T extends Themes, S extends Styles<S>, P>(
  fn: StyleCreator<T, P>,
): StyleCreator<T, P> {
  return fn;
}

export function createUseStyle<T extends Themes, S extends Styles<S>>(
  styleCreator: StyleCreator<T, undefined>,
): () => StyleObj<S>;

export function createUseStyle<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, P>,
): (params: P) => StyleObj<S>;

export function createUseStyle<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, P>,
) {
  const key = KeyGenerator.getNextKey();
  return (params: P) => {
    if (params) {
      return useStyle<T, S, P>(styleCreator, params);
    }
    return useCachedStyle<T, S, P>(styleCreator, key);
  };
}

export function createThemedStyleCreator<T extends Themes>() {
  return function <S extends Styles<S>, P>(styleCreator: StyleCreator<T, P>) {
    return createStyle<T, S, P>(styleCreator);
  };
}

export function createThemedUseStyleCreator<T extends Themes>(): <
  S extends Styles<S>,
  P = undefined,
>(
  styleCreator: StyleCreator<T, P>,
) => P extends undefined ? () => StyleObj<S> : (params: P) => StyleObj<S>;

export function createThemedUseStyleCreator<
  T extends Themes,
  DS extends Styles<DS>,
>(): <S extends Styles<S>, P = undefined>(
  styleCreator: StyleCreator<T, P>,
) => P extends undefined
  ? () => CombinedStyleObj<S, DS>
  : (params: P) => CombinedStyleObj<S, DS>;

export function createThemedUseStyleCreator<T extends Themes>() {
  return function <S extends Styles<S>, P>(styleCreator: StyleCreator<T, P>) {
    return createUseStyle(styleCreator);
  };
}

export function createStylesWithProps<S extends Styles<S>, P>(
  fn: (props: P) => S,
) {
  return function (props: P) {
    return fn(props);
  };
}

export function createThemeBag<T extends Themes>() {
  const ThemedProvider: React.ComponentType<ThemeContextProps<T>> =
    ThemeProvider;
  return {
    ThemeProvider: ThemedProvider,
    createUseStyle: createThemedUseStyleCreator<T, DS>(),
    createStyle: createThemedStyleCreator<T>(),
    useTheme: createUseTheme<T, DS>(),
    useThemeDispatch: createUseThemeDispatch<T>(),
  };
}

export function createThemeBag<T extends Themes, DS extends Styles<DS>>() {
  const ThemedProvider: React.ComponentType<ThemeContextProps<T, DS>> =
    ThemeProvider;
  return {
    ThemeProvider: ThemedProvider,
    createUseStyle: createThemedUseStyleCreator<T, DS>(),
    createStyle: createThemedStyleCreator<T>(),
    useTheme: createUseTheme<T, DS>(),
    useThemeDispatch: createUseThemeDispatch<T>(),
  };
}
