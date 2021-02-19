import * as React from 'react';

import {
  NamedStyles,
  StyleCreator,
  StyleCreatorWithParams,
  StyleObj,
  ThemeContextValue,
  ThemeDispatchContextValue,
  Themes,
  UseStyle,
} from './types';
import { ThemeContext, ThemeDispatchContext } from './ThemeContext';

export const useStyle: UseStyle<any> = (styleCreator: any, params?: any) => {
  const { selectedTheme, themes } = useTheme();

  const styles = React.useMemo(() => {
    const theme = themes[selectedTheme];
    return styleCreator(theme, params);
  }, [styleCreator, selectedTheme, themes, params]);

  return styles;
};

// export function useStyle<S extends NamedStyles<S> | NamedStyles<any>, P>(
//   styleCreator: any,
//   params: any,
// ): StyleObj<S> {
//   const { selectedTheme, themes } = useTheme();

//   const styles = React.useMemo(() => {
//     const theme = themes[selectedTheme];
//     return styleCreator(theme, params);
//   }, [styleCreator, selectedTheme, themes, params]);

//   return styles;
// }

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
