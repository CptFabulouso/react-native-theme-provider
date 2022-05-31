import * as React from 'react';

import { ThemeProvider } from './ThemeContext';
import { useStyle, useTheme, useThemeDispatch } from './hooks';
import { getThemedDefaultCacheManager } from './stylesCache';
import {
  Styles,
  StyleCreator,
  StyleObj,
  ThemeContextProps,
  Themes,
  InitThemeProviderParams,
  StyleCacheManager,
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
  P = undefined,
>(
  styleCreator: StyleCreator<T, S, P>,
): (...params: P extends undefined ? [] : [params: P]) => StyleObj<S>;

export function createUseStyle<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, S, P>,
) {
  return (params: P) => {
    return useStyle<T, S, P>(styleCreator, params);
  };
}

export function createThemedStyleCreator<T extends Themes>(
  styleCacheManager: StyleCacheManager<T, any, any>,
) {
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createStyleCreator(styleCreator, styleCacheManager);
  };
}
export function createThemedUseStyleCreator<T extends Themes>(
  styleCacheManager: StyleCacheManager<T, any, any>,
): <S extends Styles<S>, P = undefined>(
  styleCreator: StyleCreator<T, S, P>,
) => (...params: P extends undefined ? [] : [params: P]) => StyleObj<S>;

export function createThemedUseStyleCreator<T extends Themes>(
  styleCacheManager: StyleCacheManager<T, any, any>,
) {
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createUseStyle(createStyleCreator(styleCreator, styleCacheManager));
  };
}

export function initThemeProvider<T extends Themes>({
  themes,
  initialTheme,
  onThemeChange,
  styleCacheManager = getThemedDefaultCacheManager<T, any, any>(),
}: InitThemeProviderParams<T>) {
  const ThemedThemedProvider = ({
    children,
    onThemeChange: propsOnThemeChange,
    initialTheme: propsInitialTheme,
  }: {
    children: React.ReactNode;
  } & Partial<ThemeContextProps<T>>) => {
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
      >
        {children}
      </ThemeProvider>
    );
  };
  const ThemedProviderComponent: React.ComponentType<ThemeContextProps<T>> =
    ThemeProvider;

  return {
    ThemeProvider: ThemedThemedProvider,
    ThemedProviderComponent,
    createUseStyle: createThemedUseStyleCreator<T>(styleCacheManager),
    createStyle: createThemedStyleCreator<T>(styleCacheManager),
    useTheme: createThemedUseTheme<T>(),
    useThemeDispatch: createThemedUseThemeDispatch<T>(),
  };
}
