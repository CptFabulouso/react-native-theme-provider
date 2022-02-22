import * as React from 'react';

import {
  ExtractThemeNames,
  ThemeContextProps,
  ThemeContextValue,
  ThemeDispatchContextValue,
  Themes,
} from './types';

export const ThemeContext = React.createContext<ThemeContextValue<any> | null>(
  null,
);

export const ThemeDispatchContext =
  React.createContext<ThemeDispatchContextValue<any> | null>(null);

export function ThemeProvider<T extends Themes>({
  children,
  initialTheme,
  onThemeChange,
  themes,
}: ThemeContextProps<T>) {
  const [themeName, setThemeName] =
    React.useState<ExtractThemeNames<T>>(initialTheme);

  const changeTheme = React.useCallback(
    (t: any) => {
      onThemeChange && onThemeChange(t);
      setThemeName(t);
    },
    [onThemeChange],
  );

  return (
    <ThemeContext.Provider
      value={{ selectedTheme: themeName, themes, t: themes[themeName] }}
    >
      <ThemeDispatchContext.Provider value={{ setTheme: changeTheme }}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}
