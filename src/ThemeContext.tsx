import * as React from 'react';

import { createThemedDefaultCacheManager } from './creators';
import {
  ExtractThemeNames,
  ThemeContextProps,
  ThemeContextValue,
  ThemeBaseStylesContextValue,
  ThemeDispatchContextValue,
  Themes,
  Styles,
} from './types';

export const ThemeContext = React.createContext<ThemeContextValue<
  any,
  any,
  any
> | null>(null);

export const ThemeBaseStylesContext =
  React.createContext<ThemeBaseStylesContextValue<any, any> | null>(null);

export const ThemeDispatchContext =
  React.createContext<ThemeDispatchContextValue<any, any> | null>(null);

export function ThemeProvider<
  T extends Themes,
  BS extends Styles<BS>,
  BSKey extends string,
  ThemeKey extends string,
  TP,
>({
  children,
  initialTheme,
  onThemeChange,
  onThemeParamsChange,
  themes,
  baseStylesCreator,
  initialThemeParams,
  styleCacheManager = createThemedDefaultCacheManager<T>(),
  baseStylesKey = 'bs' as BSKey,
  themeKey = 't' as ThemeKey,
}: ThemeContextProps<T, BS, BSKey, ThemeKey, TP>) {
  const [themeName, setThemeName] =
    React.useState<ExtractThemeNames<T>>(initialTheme);
  const [themeParams, setThemeParams] = React.useState(initialThemeParams);

  React.useEffect(() => {
    styleCacheManager.onProviderMount && styleCacheManager.onProviderMount();
  }, [styleCacheManager]);

  const t = React.useMemo(
    () =>
      typeof themes === 'function'
        ? themes(themeParams as TP)[themeName]
        : themes[themeName],
    [themes, themeName, themeParams],
  );

  const baseStyles = React.useMemo(
    () => (baseStylesCreator ? baseStylesCreator(t) : null),
    [baseStylesCreator, t],
  );

  const changeTheme = React.useCallback(
    (nextTheme: any) => {
      onThemeChange && onThemeChange(nextTheme);
      setThemeName(nextTheme);
      styleCacheManager.onThemeChange(nextTheme);
    },
    [onThemeChange, styleCacheManager],
  );

  const changeThemeParams = React.useCallback(
    (nextParams: TP) => {
      onThemeParamsChange && onThemeParamsChange(nextParams);
      setThemeParams(nextParams);
    },
    [onThemeParamsChange],
  );

  const themeValue = React.useMemo(
    () => ({
      selectedTheme: themeName,
      themes,
      themeKey,
      [themeKey]: t,
      themeParams,
    }),
    [themeName, themes, themeKey, t, themeParams],
  );

  const baseStylesValue = React.useMemo(
    () => ({
      baseStyles,
      baseStylesKey,
    }),
    [baseStyles, baseStylesKey],
  );
  const themeDispatchValue = React.useMemo(
    () => ({ setTheme: changeTheme, setThemeParams: changeThemeParams }),
    [changeTheme, changeThemeParams],
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <ThemeBaseStylesContext.Provider value={baseStylesValue}>
        <ThemeDispatchContext.Provider value={themeDispatchValue}>
          {children}
        </ThemeDispatchContext.Provider>
      </ThemeBaseStylesContext.Provider>
    </ThemeContext.Provider>
  );
}
