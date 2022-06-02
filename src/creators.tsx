import * as React from 'react';

import { ThemeProvider } from './ThemeContext';
import { useStyle, useTheme, useThemeDispatch } from './hooks';
import { createDefaultCacheManager } from './stylesCache';
import {
  Styles,
  StyleCreator,
  ThemeContextProps,
  CombinedStyleObj,
  BaseStyles,
  Themes,
  InitThemeProviderParams,
  StyleCacheManager,
  BaseStyleCreator,
} from './types';

export function createThemedUseTheme<T extends Themes>() {
  return function () {
    return useTheme<T>();
  };
}

export function createThemedUseThemeDispatch<T extends Themes>() {
  return function () {
    return useThemeDispatch<T>();
  };
}

export function createThemedDefaultCacheManager<T extends Themes>() {
  function themedCacheManager<S extends Styles<S>, P>() {
    return createDefaultCacheManager<T, S, P>();
  }
  return themedCacheManager();
}

export function createThemedBaseStylesCreator<T extends Themes>() {
  return function <BS extends Styles<BS>>(
    baseStylesCreator: BaseStyleCreator<T, BS>,
  ) {
    return baseStylesCreator;
  };
}

export function createStyleCreator<T extends Themes, S extends Styles<S>>(
  styleCreator: StyleCreator<T, S>,
  styleCacheManager: StyleCacheManager<T, S>,
): StyleCreator<T, S>;
export function createStyleCreator<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, S, P>,
  styleCacheManager: StyleCacheManager<T, S, P>,
): StyleCreator<T, S, P>;
export function createStyleCreator<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, S, P>,
  styleCacheManager: StyleCacheManager<T, S, P>,
) {
  return styleCacheManager.onCacheStyleCreator(styleCreator);
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
  BS extends BaseStyles<BS>,
  P = undefined,
>(
  styleCreator: StyleCreator<T, S, P>,
): (
  ...params: P extends undefined ? [] : [params: P]
) => CombinedStyleObj<S, BS>;

export function createUseStyle<
  T extends Themes,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  P,
>(styleCreator: StyleCreator<T, S, P>) {
  return (params: P) => {
    return useStyle<T, S, BS, P>(styleCreator, params);
  };
}

export function createThemedUseStyle<
  T extends Themes,
  BS extends BaseStyles<BS> = undefined,
>() {
  return function <S extends Styles<S>>(styleCreator: StyleCreator<T, S>) {
    return useStyle<T, S, BS>(styleCreator, undefined);
  };
}

export function createThemedUseStyleWithParams<
  T extends Themes,
  BS extends BaseStyles<BS> = undefined,
>() {
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
    params: P,
  ) {
    return useStyle<T, S, BS, P>(styleCreator, params);
  };
}

export function createThemedStyleCreator<T extends Themes>(
  styleCacheManager: StyleCacheManager<T, any, any>,
) {
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createStyleCreator<T, S, P>(styleCreator, styleCacheManager);
  };
}

export function createThemedUseStyleCreator<
  T extends Themes,
  BS extends BaseStyles<BS> = undefined,
>(
  styleCacheManager: StyleCacheManager<T, any, any>,
): <S extends Styles<S>, P = undefined>(
  styleCreator: StyleCreator<T, S, P>,
) => (
  ...params: P extends undefined ? [] : [params: P]
) => CombinedStyleObj<S, BS>;

export function createThemedUseStyleCreator<
  T extends Themes,
  BS extends BaseStyles<BS>,
>(styleCacheManager: StyleCacheManager<T, any, any>) {
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createUseStyle<T, S, BS, P>(
      createStyleCreator(styleCreator, styleCacheManager),
    );
  };
}

export function initThemeProvider<
  T extends Themes,
  BS extends Styles<BS> = undefined,
>({
  themes,
  initialTheme,
  onThemeChange,
  styleCacheManager = createThemedDefaultCacheManager<T>(),
  baseStylesCreator,
}: InitThemeProviderParams<T, BS>) {
  const ThemedThemedProvider = ({
    children,
    onThemeChange: propsOnThemeChange,
    initialTheme: propsInitialTheme,
    baseStylesCreator: propsBaseStylesCreator,
  }: {
    children: React.ReactNode;
  } & Partial<ThemeContextProps<T, BS>>) => {
    React.useEffect(() => {
      styleCacheManager.onProviderMount && styleCacheManager.onProviderMount();
    }, []);

    const handleThemeChange = React.useCallback(
      (nextThemeName: keyof T) => {
        propsOnThemeChange && propsOnThemeChange(nextThemeName);
        onThemeChange && onThemeChange(nextThemeName);
        styleCacheManager.onThemeChange(nextThemeName);
      },
      [propsOnThemeChange],
    );

    return (
      <ThemeProvider
        initialTheme={propsInitialTheme ?? initialTheme}
        themes={themes}
        onThemeChange={handleThemeChange}
        baseStylesCreator={propsBaseStylesCreator ?? baseStylesCreator}
      >
        {children}
      </ThemeProvider>
    );
  };
  const ThemedProviderComponent: React.ComponentType<ThemeContextProps<T, BS>> =
    ThemeProvider;

  return {
    ThemeProvider: ThemedThemedProvider,
    ThemedProviderComponent,
    createUseStyle: createThemedUseStyleCreator<T, BS>(styleCacheManager),
    createStyle: createThemedStyleCreator<T>(styleCacheManager),
    useTheme: createThemedUseTheme<T>(),
    useThemeDispatch: createThemedUseThemeDispatch<T>(),
    useStyle: createThemedUseStyle<T, BS>(),
    useStyleWithParams: createThemedUseStyleWithParams<T, BS>(),
  };
}
