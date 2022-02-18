import * as React from 'react';

import { StylesCache } from './stylesCache';
import {
  ExtractThemeNames,
  ThemeContextProps,
  ThemeContextValue,
  ThemeDispatchContextValue,
  Themes,
  NamedStyles,
} from './types';

export const ThemeContext = React.createContext<ThemeContextValue<
  any,
  any
> | null>(null);

export const ThemeDispatchContext =
  React.createContext<ThemeDispatchContextValue<any> | null>(null);

export function ThemeProvider<
  T extends Themes,
  DS extends NamedStyles<DS> | NamedStyles<any>,
>({
  children,
  initialTheme,
  defaultStylesCreator,
  themes,
}: ThemeContextProps<T, DS>) {
  const [themeName, setThemeName] =
    React.useState<ExtractThemeNames<T>>(initialTheme);

  const changeTheme = React.useCallback((t: any) => {
    StylesCache.resetAll();
    setThemeName(t);
  }, []);

  const t = React.useMemo(() => themes[themeName], [themes, themeName]);

  const defaultStyles = React.useMemo(
    () => (defaultStylesCreator ? defaultStylesCreator(t) : null),
    [defaultStylesCreator, t],
  );

  return (
    <ThemeContext.Provider
      value={{ selectedTheme: themeName, themes, t, defaultStyles }}
    >
      <ThemeDispatchContext.Provider value={{ setTheme: changeTheme }}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}
