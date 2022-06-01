import * as React from 'react';

import {
  ExtractThemeNames,
  ThemeContextProps,
  ThemeContextValue,
  ThemeBaseStylesContextValue,
  ThemeDispatchContextValue,
  Themes,
  Styles,
} from './types';

export const ThemeContext = React.createContext<ThemeContextValue<any> | null>(
  null,
);

export const ThemeBaseStylesContext =
  React.createContext<ThemeBaseStylesContextValue<any> | null>(null);

export const ThemeDispatchContext =
  React.createContext<ThemeDispatchContextValue<any> | null>(null);

export function ThemeProvider<T extends Themes, BS extends Styles<BS>>({
  children,
  initialTheme,
  onThemeChange,
  themes,
  baseStylesCreator,
}: ThemeContextProps<T, BS>) {
  const [themeName, setThemeName] =
    React.useState<ExtractThemeNames<T>>(initialTheme);
  const t = React.useMemo(() => themes[themeName], [themes, themeName]);

  const baseStyles = React.useMemo(
    () => (baseStylesCreator ? baseStylesCreator(t) : null),
    [baseStylesCreator, t],
  );

  const changeTheme = React.useCallback(
    (nextTheme: any) => {
      onThemeChange && onThemeChange(nextTheme);
      setThemeName(nextTheme);
    },
    [onThemeChange],
  );

  return (
    <ThemeContext.Provider value={{ selectedTheme: themeName, themes, t }}>
      <ThemeBaseStylesContext.Provider value={{ baseStyles }}>
        <ThemeDispatchContext.Provider value={{ setTheme: changeTheme }}>
          {children}
        </ThemeDispatchContext.Provider>
      </ThemeBaseStylesContext.Provider>
    </ThemeContext.Provider>
  );
}
