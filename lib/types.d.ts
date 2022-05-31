import * as React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
export declare type Theme = Record<string, any>;
export declare type Themes = Record<string, Theme>;
export declare type ExtractThemeNames<T extends Themes> = keyof T;
export declare type ExtractThemes<T extends Themes> = T[keyof T];
export declare type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
export declare type Styles<S> = NamedStyles<S> | NamedStyles<any>;
export declare type StyleObj<S extends NamedStyles<S> | NamedStyles<any>> = S;
export declare type ThemeContextValue<T extends Themes> = {
    selectedTheme: ExtractThemeNames<T>;
    themes: T;
    t: ExtractThemes<T>;
};
export declare type ThemeDispatchContextValue<T extends Themes> = {
    setTheme: (t: ExtractThemeNames<T>) => void;
};
export declare type ThemeContextProps<T extends Themes> = {
    children: React.ReactNode;
    initialTheme: ExtractThemeNames<T>;
    themes: T;
    onThemeChange?: (nextThemeName: ExtractThemeNames<T>) => void;
};
export declare type StyleCreator<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>, P = undefined> = (theme: ExtractThemes<T>, params: P) => StyleObj<S>;
export declare type StyleCacheManager<T extends Themes, S extends Styles<S>, P = undefined> = {
    /**
     * Called when mounting the ThemeProvider.
     */
    onProviderMount?: () => void;
    /**
      Modify your cache if theme changes
    */
    onThemeChange: (themeName: keyof T) => void;
    /**
      Called for each style creator - function inside createStyle or createUseStyle.
      It receives the style creator and allows to return cached value instead of running the style creator again leading to styles recalculation.
    */
    onCacheStyleCreator: (styleCreator: StyleCreator<T, S, P>) => StyleCreator<T, S, P>;
};
export declare type InitThemeProviderParams<T extends Themes> = {
    themes: T;
    initialTheme: ExtractThemeNames<T>;
    onThemeChange?: (nextThemeName: keyof T) => void;
    styleCacheManager?: StyleCacheManager<T, any, any>;
};
