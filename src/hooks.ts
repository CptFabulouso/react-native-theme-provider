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
  CombinedStyleObj,
  ThemeContextValue,
  ThemeDispatchContextValue,
  Themes,
  ThemeBaseStylesContextValue,
} from './types';

export function useStyle<
  T extends Themes,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  BSKey extends string,
>(
  styleCreator: StyleCreator<T, S>,
  params?: undefined,
): CombinedStyleObj<S, BS, BSKey>;
export function useStyle<
  T extends Themes,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  BSKey extends string,
  P,
>(
  styleCreator: StyleCreator<T, S, P>,
  params: P,
): CombinedStyleObj<S, BS, BSKey>;

export function useStyle<
  T extends Themes,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  BSKey extends string,
  ThemeKey extends string,
  P,
>(styleCreator: (theme: ExtractThemes<T>, p?: P) => StyleObj<S>, params?: P) {
  const { baseStyles, baseStylesKey } = useThemeBaseStyles<BS, BSKey>();
  const useThemeValues = useTheme<T, ThemeKey, any>();
  const t = useThemeValues[
    useThemeValues.themeKey
  ] as unknown as ExtractThemes<T>;

  const styles = React.useMemo(() => {
    const createdStyles = styleCreator(t, params) as
      | StyleObj<S>
      | CombinedStyleObj<S, BS, BSKey>;
    if (baseStyles) {
      return {
        ...createdStyles,
        [baseStylesKey]: baseStyles,
      };
    }
    return createdStyles;
  }, [styleCreator, t, params, baseStylesKey, baseStyles]);

  return styles;
}

export function useTheme<
  T extends Themes,
  ThemeKey extends string,
  TP,
>(): ThemeContextValue<T, ThemeKey, TP> {
  const context = React.useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context as ThemeContextValue<T, ThemeKey, TP>;
}

export function useThemeBaseStyles<
  BS extends BaseStyles<BS>,
  BSKey extends string,
>(): ThemeBaseStylesContextValue<BS, BSKey> {
  const context = React.useContext(ThemeBaseStylesContext);

  if (context === null) {
    throw new Error('useThemeBaseStyles must be used within a ThemeProvider');
  }
  return context;
}

export function useThemeDispatch<
  T extends Themes,
  TP,
>(): ThemeDispatchContextValue<T, TP> {
  const context = React.useContext(ThemeDispatchContext);
  if (context === null) {
    throw new Error('useThemeDispatch must be used within a ThemeProvider');
  }
  return context;
}
