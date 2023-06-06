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
  ThemeContextValue,
  ThemeDispatchContextValue,
} from './types';

export function createThemedUseTheme<
  T extends Themes,
  ThemeKey extends string,
  P,
>(): () => ThemeContextValue<T, ThemeKey, P> {
  return function () {
    return useTheme<T, ThemeKey, P>();
  };
}

export function createThemedUseThemeDispatch<
  T extends Themes,
  P,
>(): () => ThemeDispatchContextValue<T, P> {
  return function () {
    return useThemeDispatch<T, P>();
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
  BSKey extends string,
  P = undefined,
>(
  styleCreator: StyleCreator<T, S, P>,
): (
  ...params: P extends undefined ? [] : [params: P]
) => CombinedStyleObj<S, BS, BSKey>;

export function createUseStyle<
  T extends Themes,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  BSKey extends string,
  P,
>(styleCreator: StyleCreator<T, S, P>) {
  return (params: P) => {
    return useStyle<T, S, BS, BSKey, P>(styleCreator, params);
  };
}

export function createThemedUseStyle<
  T extends Themes,
  BS extends BaseStyles<BS> = undefined,
  BSKey extends string = 'bs',
>() {
  return function <S extends Styles<S>>(styleCreator: StyleCreator<T, S>) {
    return useStyle<T, S, BS, BSKey>(styleCreator, undefined);
  };
}

export function createThemedUseStyleWithParams<
  T extends Themes,
  BS extends BaseStyles<BS> = undefined,
  BSKey extends string = 'bs',
>() {
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
    params: P,
  ) {
    return useStyle<T, S, BS, BSKey, P>(styleCreator, params);
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
  BSKey extends string = 'bs',
>(
  styleCacheManager: StyleCacheManager<T, any, any>,
): <S extends Styles<S>, P = undefined>(
  styleCreator: StyleCreator<T, S, P>,
) => (
  ...params: P extends undefined ? [] : [params: P]
) => CombinedStyleObj<S, BS, BSKey>;

export function createThemedUseStyleCreator<
  T extends Themes,
  BS extends BaseStyles<BS>,
  BSKey extends string,
>(styleCacheManager: StyleCacheManager<T, any, any>) {
  return function <S extends Styles<S>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createUseStyle<T, S, BS, BSKey, P>(
      createStyleCreator(styleCreator, styleCacheManager),
    );
  };
}

export function initThemeProvider<
  T extends Themes,
  BSKey extends string = 'bs',
  BS extends Styles<BS> = undefined,
  ThemeKey extends string = 't',
  TP = undefined,
>({
  themes,
  initialTheme,
  onThemeChange,
  onThemeParamsChange,
  styleCacheManager = createThemedDefaultCacheManager<T>(),
  baseStylesCreator,
  initialThemeParams,
  baseStylesKey = 'bs' as BSKey,
  themeKey = 't' as ThemeKey,
}: InitThemeProviderParams<T, BS, BSKey, ThemeKey, TP>) {
  const ThemedThemedProvider = ({
    children,
    onThemeChange: propsOnThemeChange,
    onThemeParamsChange: propsOnThemeParamsChange,
    initialTheme: propsInitialTheme,
    baseStylesCreator: propsBaseStylesCreator,
    initialThemeParams: propsInitialThemeParams,
    themeKey: propsThemeKey,
    baseStylesKey: propsBaseStylesKey,
  }: {
    children: React.ReactNode;
  } & Partial<ThemeContextProps<T, BS, BSKey, ThemeKey, TP>>) => {
    const handleThemeChange = React.useCallback(
      (nextThemeName: keyof T) => {
        propsOnThemeChange && propsOnThemeChange(nextThemeName);
        onThemeChange && onThemeChange(nextThemeName);
      },
      [propsOnThemeChange],
    );
    const handleThemeParamsChange = React.useCallback(
      (nextParams: TP) => {
        propsOnThemeParamsChange && propsOnThemeParamsChange(nextParams);
        onThemeParamsChange && onThemeParamsChange(nextParams);
      },
      [propsOnThemeParamsChange],
    );

    return (
      <ThemeProvider
        initialTheme={propsInitialTheme ?? initialTheme}
        themes={themes}
        onThemeChange={handleThemeChange}
        onThemeParamsChange={handleThemeParamsChange}
        baseStylesCreator={propsBaseStylesCreator ?? baseStylesCreator}
        baseStylesKey={propsBaseStylesKey ?? baseStylesKey}
        initialThemeParams={propsInitialThemeParams ?? initialThemeParams}
        themeKey={propsThemeKey ?? themeKey}
      >
        {children}
      </ThemeProvider>
    );
  };
  const ThemedProviderComponent: React.ComponentType<
    ThemeContextProps<T, BS, BSKey, ThemeKey, TP>
  > = ThemeProvider;

  return {
    ThemeProvider: ThemedThemedProvider,
    ThemedProviderComponent,
    createUseStyle: createThemedUseStyleCreator<T, BS, BSKey>(
      styleCacheManager,
    ),
    createStyle: createThemedStyleCreator<T>(styleCacheManager),
    useTheme: createThemedUseTheme<T, ThemeKey, TP>(),
    useThemeDispatch: createThemedUseThemeDispatch<T, TP>(),
    useStyle: createThemedUseStyle<T, BS, BSKey>(),
    useStyleWithParams: createThemedUseStyleWithParams<T, BS, BSKey>(),
  };
}
