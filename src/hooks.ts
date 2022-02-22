import * as React from 'react';

import { ThemeContext, ThemeDispatchContext } from './ThemeContext';
import {
  ExtractThemes,
  Styles,
  StyleCreator,
  StyleObj,
  ThemeContextValue,
  ThemeDispatchContextValue,
  Themes,
} from './types';

export function useStyle<T extends Themes, S extends Styles<S>>(
  styleCreator: StyleCreator<T, S>,
  params?: undefined,
): StyleObj<S>;
export function useStyle<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, S, P>,
  params: P,
): StyleObj<S>;

export function useStyle<T extends Themes, S extends Styles<S>, P>(
  styleCreator: (theme: ExtractThemes<T>, p?: P) => StyleObj<S>,
  params?: P,
) {
  const { t } = useTheme<T>();

  const styles = React.useMemo(() => {
    return styleCreator(t, params);
  }, [styleCreator, t, params]);

  return styles;
}

export function useTheme<T extends Themes>(): ThemeContextValue<T> {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeDispatch<
  T extends Themes,
>(): ThemeDispatchContextValue<T> {
  const context = React.useContext(ThemeDispatchContext);
  if (context === null) {
    throw new Error('useThemeDispatch must be used within a ThemeProvider');
  }
  return context;
}
