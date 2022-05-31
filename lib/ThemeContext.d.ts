import * as React from 'react';
import { ThemeContextProps, ThemeContextValue, ThemeDispatchContextValue, Themes } from './types';
export declare const ThemeContext: React.Context<ThemeContextValue<any> | null>;
export declare const ThemeDispatchContext: React.Context<ThemeDispatchContextValue<any> | null>;
export declare function ThemeProvider<T extends Themes>({ children, initialTheme, onThemeChange, themes, }: ThemeContextProps<T>): JSX.Element;
