import { KeyGenerator } from './stylesCache';
import { NamedStyles, StyleCreator, StyleObj, Themes } from './types';
import { useCachedStyle, useStyle, useTheme, useThemeDispatch } from './hooks';

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
>(fn: StyleCreator<T, S, undefined>): StyleCreator<T, S, undefined>;

export function createStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(fn: StyleCreator<T, S, P>): StyleCreator<T, S, P>;

export function createStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(fn: StyleCreator<T, S, P>): StyleCreator<T, S, P> {
  return fn;
}

export function createUseStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>
>(styleCreator: StyleCreator<T, S, undefined>): () => StyleObj<S>;

export function createUseStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(styleCreator: StyleCreator<T, S, P>): (params: P) => StyleObj<S>;

export function createUseStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(styleCreator: StyleCreator<T, S, P>) {
  const key = KeyGenerator.getNextKey();
  return (params: P) => {
    if (params) {
      return useStyle<T, S, P>(styleCreator, params);
    }
    return useCachedStyle<T, S, P>(styleCreator, key);
  };
}

export function createThemedStyleCreator<T extends Themes>() {
  return function <S extends NamedStyles<S> | NamedStyles<any>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createStyle<T, S, P>(styleCreator);
  };
}

export function createThemedUseStyleCreator<T extends Themes>(): <
  S extends NamedStyles<S> | NamedStyles<any>,
  P = undefined
>(
  styleCreator: StyleCreator<T, S, P>,
) => P extends undefined ? () => StyleObj<S> : (params: P) => StyleObj<S>;

export function createThemedUseStyleCreator<T extends Themes>() {
  return function <S extends NamedStyles<S> | NamedStyles<any>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createUseStyle(styleCreator);
  };
}

export function createDefaultStylesCreator<
  S extends NamedStyles<S> | NamedStyles<any>
>() {
  return function <P>(fn: (props: P) => S): S {
    fn();
  };
}
