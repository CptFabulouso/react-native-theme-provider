import * as React from 'react';

import {
  ExtractThemes,
  NamedStyles,
  StyleCreator,
  StyleObj,
  ThemeContextValue,
  ThemeDispatchContextValue,
  Themes,
} from './types';
import { ThemeContext, ThemeDispatchContext } from './ThemeContext';

export function useStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>
>(styleCreator: StyleCreator<T, S, undefined>): StyleObj<S>;
export function useStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(styleCreator: StyleCreator<T, S, P>, params: P): StyleObj<S>;

export function useStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(styleCreator: (theme: ExtractThemes<T>, p?: P) => StyleObj<S>, params?: P) {
  const { selectedTheme, themes } = useTheme<T>();

  const styles = React.useMemo(() => {
    const theme = themes[selectedTheme];
    return styleCreator(theme, params);
  }, [styleCreator, selectedTheme, themes, params]);

  return styles;
}

export function useTheme<T extends Themes>(): ThemeContextValue<T> {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeDispatch<T extends Themes>(): ThemeDispatchContextValue<
  T
> {
  const context = React.useContext(ThemeDispatchContext);
  if (context === null) {
    throw new Error('useThemeDispatch must be used within a ThemeProvider');
  }
  return context;
}
