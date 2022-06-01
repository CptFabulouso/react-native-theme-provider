import * as React from 'react';

import {
  ThemeBaseStylesContext,
  ThemeContext,
  ThemeDispatchContext,
} from './ThemeContext';
import {
  ExtractThemes,
  Styles,
  BaseStyles,
  StyleCreator,
  StyleObj,
  BaseStyleObj,
  CombinedStyleObj,
  ThemeContextValue,
  ThemeDispatchContextValue,
  Themes,
  ThemeBaseStylesContextValue,
} from './types';

function withBaseStyles<S, BS>(
  styles: StyleObj<S>,
  baseStyles: BaseStyleObj<BS>,
): styles is S & { bs: BS } {
  return !!baseStyles;
}

export function useStyle<
  T extends Themes,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
>(
  styleCreator: StyleCreator<T, S>,
  params?: undefined,
): CombinedStyleObj<S, BS>;
export function useStyle<
  T extends Themes,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  P,
>(styleCreator: StyleCreator<T, S, P>, params: P): CombinedStyleObj<S, BS>;

export function useStyle<
  T extends Themes,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  P,
>(styleCreator: (theme: ExtractThemes<T>, p?: P) => StyleObj<S>, params?: P) {
  const { baseStyles } = useThemeBaseStyles<BS>();
  const { t } = useTheme<T>();

  const styles = React.useMemo(() => {
    const createdStyles = styleCreator(t, params) as CombinedStyleObj<S, BS>;
    if (withBaseStyles<S, BS>(createdStyles, baseStyles)) {
      createdStyles.bs = baseStyles;
    }
    // if (baseStyles) {
    // }
    return createdStyles;
  }, [styleCreator, t, params, baseStyles]);

  return styles;
}

export function useTheme<T extends Themes>(): ThemeContextValue<T> {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeBaseStyles<
  BS extends BaseStyles<BS>,
>(): ThemeBaseStylesContextValue<BS> {
  const context = React.useContext(ThemeBaseStylesContext);

  if (context === null) {
    throw new Error('useThemeBaseStyles must be used within a ThemeProvider');
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
