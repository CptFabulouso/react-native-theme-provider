import { NamedStyles, StyleCreator, Themes } from './types';
import { useTheme, useThemeDispatch } from './hooks';

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
  S extends NamedStyles<S> | NamedStyles<any>
>(fn: StyleCreator<T, S>): StyleCreator<T, S> {
  return fn;
}

export function createStyleCreator<T extends Themes>() {
  return function <S extends NamedStyles<S> | NamedStyles<any>>(
    fn: StyleCreator<T, S>,
  ): StyleCreator<T, S> {
    return createStyle<T, S>(fn);
  };
}
