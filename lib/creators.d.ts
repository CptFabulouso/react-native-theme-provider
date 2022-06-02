import * as React from 'react';
import { Styles, StyleCreator, ThemeContextProps, CombinedStyleObj, BaseStyles, Themes, InitThemeProviderParams, StyleCacheManager, BaseStyleCreator, ThemeContextValue, ThemeDispatchContextValue } from './types';
export declare function createThemedUseTheme<T extends Themes, P>(): () => ThemeContextValue<T, P>;
export declare function createThemedUseThemeDispatch<T extends Themes, P>(): () => ThemeDispatchContextValue<T, P>;
export declare function createThemedDefaultCacheManager<T extends Themes>(): StyleCacheManager<T, Styles<unknown>, unknown>;
export declare function createThemedBaseStylesCreator<T extends Themes>(): <BS extends Styles<BS>>(baseStylesCreator: BaseStyleCreator<T, BS>) => BaseStyleCreator<T, BS>;
export declare function createStyleCreator<T extends Themes, S extends Styles<S>>(styleCreator: StyleCreator<T, S>, styleCacheManager: StyleCacheManager<T, S>): StyleCreator<T, S>;
export declare function createStyleCreator<T extends Themes, S extends Styles<S>, P>(styleCreator: StyleCreator<T, S, P>, styleCacheManager: StyleCacheManager<T, S, P>): StyleCreator<T, S, P>;
export declare function createStyle<T extends Themes, S extends Styles<S>>(fn: StyleCreator<T, S>): StyleCreator<T, S>;
export declare function createStyle<T extends Themes, S extends Styles<S>, P>(fn: StyleCreator<T, S, P>): StyleCreator<T, S, P>;
export declare function createUseStyle<T extends Themes, S extends Styles<S>, BS extends BaseStyles<BS>, P = undefined>(styleCreator: StyleCreator<T, S, P>): (...params: P extends undefined ? [] : [params: P]) => CombinedStyleObj<S, BS>;
export declare function createThemedUseStyle<T extends Themes, BS extends BaseStyles<BS> = undefined>(): <S extends Styles<S>>(styleCreator: StyleCreator<T, S, undefined>) => CombinedStyleObj<S, BS>;
export declare function createThemedUseStyleWithParams<T extends Themes, BS extends BaseStyles<BS> = undefined>(): <S extends Styles<S>, P>(styleCreator: StyleCreator<T, S, P>, params: P) => CombinedStyleObj<S, BS>;
export declare function createThemedStyleCreator<T extends Themes>(styleCacheManager: StyleCacheManager<T, any, any>): <S extends Styles<S>, P>(styleCreator: StyleCreator<T, S, P>) => StyleCreator<T, S, P>;
export declare function createThemedUseStyleCreator<T extends Themes, BS extends BaseStyles<BS> = undefined>(styleCacheManager: StyleCacheManager<T, any, any>): <S extends Styles<S>, P = undefined>(styleCreator: StyleCreator<T, S, P>) => (...params: P extends undefined ? [] : [params: P]) => CombinedStyleObj<S, BS>;
export declare function initThemeProvider<T extends Themes, BS extends Styles<BS> = undefined, P = undefined>({ themes, initialTheme, onThemeChange, onThemeParamsChange, styleCacheManager, baseStylesCreator, initialThemeParams, }: InitThemeProviderParams<T, BS, P>): {
    ThemeProvider: ({ children, onThemeChange: propsOnThemeChange, onThemeParamsChange: propsOnThemeParamsChange, initialTheme: propsInitialTheme, baseStylesCreator: propsBaseStylesCreator, initialThemeParams: propsInitialThemeParams, }: {
        children: React.ReactNode;
    } & Partial<ThemeContextProps<T, BS, P>>) => JSX.Element;
    ThemedProviderComponent: React.FunctionComponent<ThemeContextProps<T, BS, P>>;
    createUseStyle: <S extends Styles<S>, P_1 = undefined>(styleCreator: StyleCreator<T, S, P_1>) => (...params: P_1 extends undefined ? [] : [params: P_1]) => CombinedStyleObj<S, BS>;
    createStyle: <S_1 extends Styles<S_1>, P_2>(styleCreator: StyleCreator<T, S_1, P_2>) => StyleCreator<T, S_1, P_2>;
    useTheme: () => ThemeContextValue<T, P>;
    useThemeDispatch: () => ThemeDispatchContextValue<T, P>;
    useStyle: <S_2 extends Styles<S_2>>(styleCreator: StyleCreator<T, S_2, undefined>) => CombinedStyleObj<S_2, BS>;
    useStyleWithParams: <S_3 extends Styles<S_3>, P_3>(styleCreator: StyleCreator<T, S_3, P_3>, params: P_3) => CombinedStyleObj<S_3, BS>;
};
