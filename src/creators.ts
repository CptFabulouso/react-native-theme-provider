import { useCachedStyle, useStyle, useTheme, useThemeDispatch } from './hooks';
import { KeyGenerator } from './stylesCache';
import { Styles, StyleCreator, StyleObj, Themes } from './types';

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

export function createStyle<T extends Themes, S extends Styles<S>>(
  fn: StyleCreator<T, S>,
): StyleCreator<T, S>;

export function createStyle<T extends Themes, S extends Styles<S>, P>(
  fn: StyleCreator<T, S, P>,
): StyleCreator<T, S, P>;

export function createStyle<T extends Themes, S extends Styles<S>, P>(
  fn: StyleCreator<T, S, P>,
): StyleCreator<T, S, P> {
  return fn;
}

export function createUseStyle<
  T extends Themes,
  S extends Styles<S>,
  P = undefined,
>(
  styleCreator: StyleCreator<T, S, P>,
): (...params: P extends undefined ? [] : [params: P]) => StyleObj<S>;

export function createUseStyle<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, S, P>,
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
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createStyle<T, S, P>(styleCreator);
  };
}
export function createThemedUseStyleCreator<T extends Themes>(): <
  S extends Styles<S>,
  P = undefined,
>(
  styleCreator: StyleCreator<T, S, P>,
) => (...params: P extends undefined ? [] : [params: P]) => StyleObj<S>;

export function createThemedUseStyleCreator<T extends Themes>() {
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createUseStyle(styleCreator);
  };
}
