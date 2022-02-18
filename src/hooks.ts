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

export function useStyle<T extends Themes, S extends Styles<S>>(
  styleCreator: StyleCreator<T, S>,
  params?: undefined,
  key?: string | number,
): StyleObj<S>;
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
  const { t } = useTheme<T>();

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

  return styles;
}

export function useCachedStyle<T extends Themes, S extends Styles<S>>(
  styleCreator: StyleCreator<T, S>,
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
