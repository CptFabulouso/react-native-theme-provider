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
}: ThemeContextProps<T, BS, BSKey, TP>) {
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

  return (
    <ThemeContext.Provider
      value={{ selectedTheme: themeName, themes, t, themeParams }}
    >
      <ThemeBaseStylesContext.Provider
        value={{ baseStyles, baseStylesKey: baseStylesKey }}
      >
        <ThemeDispatchContext.Provider
          value={{ setTheme: changeTheme, setThemeParams: changeThemeParams }}
        >
          {children}
        </ThemeDispatchContext.Provider>
      </ThemeBaseStylesContext.Provider>
    </ThemeContext.Provider>
  );
}
