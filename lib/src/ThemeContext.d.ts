import * as React from 'react';
import { ThemeContextProps, ThemeContextValue, ThemeBaseStylesContextValue, ThemeDispatchContextValue, Themes, Styles } from './types';
export declare const ThemeContext: React.Context<ThemeContextValue<any, any> | null>;
export declare const ThemeBaseStylesContext: React.Context<ThemeBaseStylesContextValue<any, any> | null>;
export declare const ThemeDispatchContext: React.Context<ThemeDispatchContextValue<any, any> | null>;
export declare function ThemeProvider<T extends Themes, BS extends Styles<BS>, BSKey extends string, TP>({ children, initialTheme, onThemeChange, onThemeParamsChange, themes, baseStylesCreator, initialThemeParams, styleCacheManager, baseStylesKey, }: ThemeContextProps<T, BS, BSKey, TP>): JSX.Element;
