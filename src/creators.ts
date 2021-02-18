import { NamedStyles, StyleCreator, Themes, UseStyleCreator } from './types';
import { useStyle, useTheme, useThemeDispatch } from './hooks';

export function createUseTheme<T extends Themes>() {
  return function () {
    return useTheme<T>();
  };
}

export function createUseThemeDispatch<T extends Themes>() {
  return function () {
    return useThemeDispatch<T>();
  };
}

export function createStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(fn: StyleCreator<T, S, P>): StyleCreator<T, S, P> {
  return fn;
}

export function createUseStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(styleCreator: StyleCreator<T, S, P>): UseStyleCreator<S, P> {
  return (params: P) => useStyle<S, P>(styleCreator, params);
}

export function createStyleCreator<T extends Themes>() {
  return function <S extends NamedStyles<S> | NamedStyles<any>, P>(
    fn: StyleCreator<T, S, P>,
  ): StyleCreator<T, S, P> {
    return createStyle<T, S, P>(fn);
  };
}

export function createUseStyleCreator<T extends Themes>() {
  return function <S extends NamedStyles<S> | NamedStyles<any>, P>(
    fn: StyleCreator<T, S, P>,
  ): UseStyleCreator<S, P> {
    return createUseStyle(createStyle<T, S, P>(fn));
  };
}
