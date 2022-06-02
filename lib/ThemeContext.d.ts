import * as React from 'react';
import { ThemeContextProps, ThemeContextValue, ThemeBaseStylesContextValue, ThemeDispatchContextValue, Themes, Styles } from './types';
export declare const ThemeContext: React.Context<ThemeContextValue<any, any> | null>;
export declare const ThemeBaseStylesContext: React.Context<ThemeBaseStylesContextValue<any> | null>;
export declare const ThemeDispatchContext: React.Context<ThemeDispatchContextValue<any, any> | null>;
export declare function ThemeProvider<T extends Themes, BS extends Styles<BS>, P>({ children, initialTheme, onThemeChange, onThemeParamsChange, themes, baseStylesCreator, initialThemeParams, styleCacheManager, }: ThemeContextProps<T, BS, P>): JSX.Element;
