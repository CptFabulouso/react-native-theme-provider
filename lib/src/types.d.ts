import * as React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
export type Theme = Record<string, any>;
export type Themes = Record<string, Theme>;
export type ExtractThemeNames<T extends Themes> = keyof T;
export type ExtractThemes<T extends Themes> = T[keyof T];
export type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
export type Styles<S> = NamedStyles<S> | NamedStyles<any>;
export type BaseStyles<S> = NamedStyles<S> | NamedStyles<any> | undefined;
export type StyleObj<S extends NamedStyles<S> | NamedStyles<any>> = S;
export type BaseStyleObj<BS extends BaseStyles<BS>> = BS extends NamedStyles<any> ? StyleObj<BS> : undefined;
export type CombinedStyleObj<S extends Styles<S>, BS extends BaseStyles<BS>, BSKey extends string> = BS extends undefined ? S : S & {
    [key in BSKey]: BS;
};
export type ThemeContextValue<T extends Themes, TP> = {
    selectedTheme: ExtractThemeNames<T>;
    themes: T;
    t: ExtractThemes<T>;
    themeParams: TP;
};
export type ThemeBaseStylesContextValue<BS extends BaseStyles<BS>, BSKey extends string> = {
    baseStyles: BaseStyleObj<BS>;
    baseStylesKey: BSKey;
};
export type ThemeDispatchContextValue<T extends Themes, TP> = {
    setTheme: (t: ExtractThemeNames<T>) => void;
    setThemeParams: (p: TP) => void;
};
export type ThemeContextProps<T extends Themes, BS extends Styles<BS>, BSKey extends string, TP> = {
    initialThemeParams?: TP;
    themes: T | ((params: TP) => T);
    initialTheme: ExtractThemeNames<T>;
    onThemeParamsChange?: (nextParams: TP) => void;
    onThemeChange?: (nextThemeName: ExtractThemeNames<T>) => void;
    baseStylesCreator?: BaseStyleCreator<T, BS>;
    baseStylesKey?: BSKey;
    children: React.ReactNode;
    styleCacheManager?: StyleCacheManager<T, any, any>;
};
export type InitThemeProviderParams<T extends Themes, BS extends Styles<BS>, BSKey extends string, P = undefined> = Omit<ThemeContextProps<T, BS, BSKey, P>, 'children'>;
export type StyleCreator<T extends Themes, S extends Styles<S>, P = undefined> = (theme: ExtractThemes<T>, params: P) => StyleObj<S>;
export type BaseStyleCreator<T extends Themes, BS extends Styles<BS>> = (theme: ExtractThemes<T>) => StyleObj<BS>;
export type StyleCacheManager<T extends Themes, S extends Styles<S>, P = undefined> = {
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
export type WithUseStyleProps<F extends (...args: any) => CombinedStyleObj<any, any, string>> = {
    styles: ReturnType<F>;
};
