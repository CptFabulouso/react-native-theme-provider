import * as React from 'react';
import { Styles, StyleCreator, StyleObj, ThemeContextProps, Themes, InitThemeProviderParams, StyleCacheManager } from './types';
export declare function createThemedUseTheme<T extends Themes>(): () => import("./types").ThemeContextValue<T>;
export declare function createThemedUseThemeDispatch<T extends Themes>(): () => import("./types").ThemeDispatchContextValue<T>;
export declare function createThemedDefaultCacheManager<T extends Themes>(): StyleCacheManager<T, Styles<unknown>, unknown>;
export declare function createStyleCreator<T extends Themes, S extends Styles<S>>(styleCreator: StyleCreator<T, S>, styleCacheManager: StyleCacheManager<T, S>): StyleCreator<T, S>;
export declare function createStyleCreator<T extends Themes, S extends Styles<S>, P>(styleCreator: StyleCreator<T, S, P>, styleCacheManager: StyleCacheManager<T, S, P>): StyleCreator<T, S, P>;
export declare function createStyle<T extends Themes, S extends Styles<S>>(fn: StyleCreator<T, S>): StyleCreator<T, S>;
export declare function createStyle<T extends Themes, S extends Styles<S>, P>(fn: StyleCreator<T, S, P>): StyleCreator<T, S, P>;
export declare function createUseStyle<T extends Themes, S extends Styles<S>, P = undefined>(styleCreator: StyleCreator<T, S, P>): (...params: P extends undefined ? [] : [params: P]) => StyleObj<S>;
export declare function createThemedStyleCreator<T extends Themes>(styleCacheManager: StyleCacheManager<T, any, any>): <S extends Styles<S>, P>(styleCreator: StyleCreator<T, S, P>) => StyleCreator<T, any, P>;
export declare function createThemedUseStyleCreator<T extends Themes>(styleCacheManager: StyleCacheManager<T, any, any>): <S extends Styles<S>, P = undefined>(styleCreator: StyleCreator<T, S, P>) => (...params: P extends undefined ? [] : [params: P]) => StyleObj<S>;
export declare function initThemeProvider<T extends Themes>({ themes, initialTheme, onThemeChange, styleCacheManager, }: InitThemeProviderParams<T>): {
    ThemeProvider: ({ children, onThemeChange: propsOnThemeChange, initialTheme: propsInitialTheme, }: {
        children: React.ReactNode;
    } & Partial<ThemeContextProps<T>>) => JSX.Element;
    ThemedProviderComponent: React.FunctionComponent<ThemeContextProps<T>>;
    createUseStyle: <S extends Styles<S>, P = undefined>(styleCreator: StyleCreator<T, S, P>) => (...params: P extends undefined ? [] : [params: P]) => S;
    createStyle: <S_1 extends Styles<S_1>, P_1>(styleCreator: StyleCreator<T, S_1, P_1>) => StyleCreator<T, any, P_1>;
    useTheme: () => import("./types").ThemeContextValue<T>;
    useThemeDispatch: () => import("./types").ThemeDispatchContextValue<T>;
};
