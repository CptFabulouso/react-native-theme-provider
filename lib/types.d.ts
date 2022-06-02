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
export declare type BaseStyles<S> = NamedStyles<S> | NamedStyles<any> | undefined;
export declare type StyleObj<S extends NamedStyles<S> | NamedStyles<any>> = S;
export declare type BaseStyleObj<BS extends BaseStyles<BS>> = BS extends NamedStyles<any> ? StyleObj<BS> : undefined;
export declare type CombinedStyleObj<S extends Styles<S>, BS extends BaseStyles<BS>> = BS extends undefined ? S : S & {
    bs: BS;
};
export declare type ThemeContextValue<T extends Themes, P> = {
    selectedTheme: ExtractThemeNames<T>;
    themes: T;
    t: ExtractThemes<T>;
    themeParams: P;
};
export declare type ThemeBaseStylesContextValue<BS extends BaseStyles<BS>> = {
    baseStyles: BaseStyleObj<BS>;
};
export declare type ThemeDispatchContextValue<T extends Themes, P> = {
    setTheme: (t: ExtractThemeNames<T>) => void;
    setThemeParams: (p: P) => void;
};
export declare type ThemeContextProps<T extends Themes, BS extends Styles<BS>, P> = {
    initialThemeParams?: P;
    themes: T | ((params: P) => T);
    initialTheme: ExtractThemeNames<T>;
    onThemeParamsChange?: (nextParams: P) => void;
    onThemeChange?: (nextThemeName: ExtractThemeNames<T>) => void;
    baseStylesCreator?: BaseStyleCreator<T, BS>;
    children: React.ReactNode;
    styleCacheManager?: StyleCacheManager<T, any, any>;
};
export declare type InitThemeProviderParams<T extends Themes, BS extends Styles<BS>, P = undefined> = Omit<ThemeContextProps<T, BS, P>, 'children'>;
export declare type StyleCreator<T extends Themes, S extends Styles<S>, P = undefined> = (theme: ExtractThemes<T>, params: P) => StyleObj<S>;
export declare type BaseStyleCreator<T extends Themes, BS extends Styles<BS>> = (theme: ExtractThemes<T>) => StyleObj<BS>;
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
      Modify your cache if theme params change
    */
    onThemeParamsChange: (themeName: keyof T) => void;
    /**
      Called for each style creator - function inside createStyle or createUseStyle.
      It receives the style creator and allows to return cached value instead of running the style creator again leading to styles recalculation.
    */
    onCacheStyleCreator: (styleCreator: StyleCreator<T, S, P>) => StyleCreator<T, S, P>;
};
export declare type WithUseStyleProps<F extends (...args: any) => CombinedStyleObj<any, any>> = {
    styles: ReturnType<F>;
};
