import * as React from 'react';

import { ThemeProvider } from './ThemeContext';
import { useStyle, useTheme, useThemeDispatch } from './hooks';
import DefaultStylesCache from './stylesCache';
import {
  Styles,
  StyleCreator,
  StyleObj,
  ThemeContextProps,
  Themes,
  ExtractThemeNames,
  // styleCacheManager,
  StyleCacheManager,
} from './types';

function getDefaultCacheManager<
  T extends Themes,
  S extends Styles<S>,
  P,
>(): StyleCacheManager<T, S, P> {
  return {
    onThemeChange: () => DefaultStylesCache.resetAll(),
    onCacheStyleCreator: (styleCreator: StyleCreator<T, S, P>) => {
      // generate id for each style creator
      const id = DefaultStylesCache.generateId();

      return (t, params) => {
        const cachedStyle = DefaultStylesCache.getStyle(id, params);
        if (cachedStyle) {
          return cachedStyle;
        }
        const style = styleCreator(t, params);
        DefaultStylesCache.addStyle(id, style, params);
        return style;
      };
    },
  };
}

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

type InitParams<T extends Themes> = {
  themes: T;
  initialTheme: ExtractThemeNames<T>;
  onThemeChange?: (nextThemeName: keyof T) => void;
  styleCacheManager: StyleCacheManager<T, any, any>;
};
export function initThemeProvider<T extends Themes>({
  themes,
  initialTheme,
  onThemeChange,
  styleCacheManager = getDefaultCacheManager<T, any, any>(),
}: InitParams<T>) {
  const handleThemeChange = (nextThemeName: keyof T) => {
    onThemeChange && onThemeChange(nextThemeName);
    styleCacheManager.onThemeChange(nextThemeName);
  };

  const ThemedThemedProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
      <ThemeProvider
        initialTheme={initialTheme}
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
    useTheme: createUseTheme<T>(),
    useThemeDispatch: createUseThemeDispatch<T>(),
  };
}
