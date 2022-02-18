import * as React from 'react';

import { ThemeContext, ThemeDispatchContext } from './ThemeContext';
import { StylesCache } from './stylesCache';
import {
  ExtractThemes,
  Styles,
  StyleCreator,
  StyleObj,
  ThemeContextValue,
  ThemeDispatchContextValue,
  Themes,
} from './types';

export function useStyle<
  T extends Themes,
  DS extends Styles<DS>,
  S extends Styles<S>,
>(styleCreator: StyleCreator<T, S, undefined>): StyleObj<S>;
export function useStyle<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, S, P>,
  params: P,
  key?: string | number,
): StyleObj<S>;

export function useStyle<T extends Themes, S extends Styles<S>, P>(
  styleCreator: (theme: ExtractThemes<T>, p?: P) => StyleObj<S>,
  params?: P,
  key?: string | number,
) {
  const { t, defaultStyles } = useTheme<T, S>();

  const styles = React.useMemo(() => {
    if (!params && key) {
      const cachedStyle = StylesCache.getStyle(key);
      if (cachedStyle) {
        return cachedStyle;
      }
      const style = styleCreator(t, params);
      StylesCache.addStyle(key, style);
      return style;
    }
    return styleCreator(t, params);
  }, [styleCreator, t, params, key]);

  const combinedStyles = React.useMemo(() => {
    if (!defaultStyles) {
      return styles;
    }
    return { ...defaultStyles, ...styles };
  }, [styles, defaultStyles]);

  return combinedStyles;
}

export function useCachedStyle<T extends Themes, S extends Styles<S>>(
  styleCreator: StyleCreator<T, S, undefined>,
  key: string | number,
): StyleObj<S>;
export function useCachedStyle<T extends Themes, S extends Styles<S>, P>(
  styleCreator: StyleCreator<T, S, P>,
  key: string | number,
): StyleObj<S>;

export function useCachedStyle<T extends Themes, S extends Styles<S>, P>(
  styleCreator: (theme: ExtractThemes<T>, p?: P) => StyleObj<S>,
  key: string | number,
) {
  return useStyle(styleCreator, undefined, key);
}

export function useTheme<
  T extends Themes,
  DS extends Styles<DS>,
>(): ThemeContextValue<T, DS> {
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
