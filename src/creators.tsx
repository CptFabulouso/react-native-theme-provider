import * as React from 'react';

import { ThemeProvider } from './ThemeContext';
import { useStyle, useTheme, useThemeDispatch } from './hooks';
import { createStylesCache } from './stylesCache';
import {
  Styles,
  StyleCreator,
  StyleObj,
  ThemeContextProps,
  Themes,
  ExtractThemeNames,
  StyleCreatorCache,
} from './types';

const StylesCache = createStylesCache<any>();
export function defaultStyleCreatorCache<
  T extends Themes,
  S extends Styles<S>,
  P,
>(styleCreator: StyleCreator<T, S, P>): StyleCreator<T, S, P> {
  const id = StylesCache.generateId();

  return (t, params) => {
    const cachedStyle = StylesCache.getStyle(id, params);
    if (cachedStyle) {
      return cachedStyle;
    }
    const style = styleCreator(t, params);
    StylesCache.addStyle(id, style, params);
    return style;
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
  styleCreatorCache: StyleCreatorCache<T, S>,
): StyleCreator<T, S>;
export function createStyleCreator<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, S, P>,
  styleCreatorCache: StyleCreatorCache<T, S, P>,
): StyleCreator<T, S, P>;
export function createStyleCreator<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, S, P>,
  styleCreatorCache: StyleCreatorCache<T, S, P>,
) {
  return styleCreatorCache(styleCreator);
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
  styleCreatorCache: StyleCreatorCache<T, any, any> = defaultStyleCreatorCache,
) {
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createStyleCreator(styleCreator, styleCreatorCache);
  };
}
export function createThemedUseStyleCreator<T extends Themes>(
  styleCreatorCache?: StyleCreatorCache<T, any, any>,
): <S extends Styles<S>, P = undefined>(
  styleCreator: StyleCreator<T, S, P>,
) => (...params: P extends undefined ? [] : [params: P]) => StyleObj<S>;

export function createThemedUseStyleCreator<T extends Themes>(
  styleCreatorCache: StyleCreatorCache<T, any, any> = defaultStyleCreatorCache,
) {
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createUseStyle(createStyleCreator(styleCreator, styleCreatorCache));
  };
}

type InitParams<T extends Themes> = {
  themes: T;
  initialTheme: ExtractThemeNames<T>;
  onThemeChange?: () => void;
  styleCreatorCache?: StyleCreatorCache<T, any, any>;
};
export function initThemeProvider<T extends Themes>({
  themes,
  initialTheme,
  onThemeChange,
  styleCreatorCache,
}: InitParams<T>) {
  const handleThemeChange = () => {
    onThemeChange && onThemeChange();
    StylesCache.resetAll;
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
    createUseStyle: createThemedUseStyleCreator<T>(styleCreatorCache),
    createStyle: createThemedStyleCreator<T>(styleCreatorCache),
    useTheme: createUseTheme<T>(),
    useThemeDispatch: createUseThemeDispatch<T>(),
  };
}
