import * as React from 'react';
import { Styles, StyleCreator, ThemeContextProps, CombinedStyleObj, BaseStyles, Themes, InitThemeProviderParams, StyleCacheManager, BaseStyleCreator, ThemeContextValue, ThemeDispatchContextValue } from './types';
export declare function createThemedUseTheme<T extends Themes, ThemeKey extends string, P>(): () => ThemeContextValue<T, ThemeKey, P>;
export declare function createThemedUseThemeDispatch<T extends Themes, P>(): () => ThemeDispatchContextValue<T, P>;
export declare function createThemedDefaultCacheManager<T extends Themes>(): StyleCacheManager<T, Styles<unknown>, unknown>;
export declare function createThemedBaseStylesCreator<T extends Themes>(): <BS extends Styles<BS>>(baseStylesCreator: BaseStyleCreator<T, BS>) => BaseStyleCreator<T, BS>;
export declare function createStyleCreator<T extends Themes, S extends Styles<S>>(styleCreator: StyleCreator<T, S>, styleCacheManager: StyleCacheManager<T, S>): StyleCreator<T, S>;
export declare function createStyleCreator<T extends Themes, S extends Styles<S>, P>(styleCreator: StyleCreator<T, S, P>, styleCacheManager: StyleCacheManager<T, S, P>): StyleCreator<T, S, P>;
export declare function createStyle<T extends Themes, S extends Styles<S>>(fn: StyleCreator<T, S>): StyleCreator<T, S>;
export declare function createStyle<T extends Themes, S extends Styles<S>, P>(fn: StyleCreator<T, S, P>): StyleCreator<T, S, P>;
export declare function createUseStyle<T extends Themes, S extends Styles<S>, BS extends BaseStyles<BS>, BSKey extends string, P = undefined>(styleCreator: StyleCreator<T, S, P>): (...params: P extends undefined ? [] : [params: P]) => CombinedStyleObj<S, BS, BSKey>;
export declare function createThemedUseStyle<T extends Themes, BS extends BaseStyles<BS> = undefined, BSKey extends string = 'bs'>(): <S extends Styles<S>>(styleCreator: StyleCreator<T, S>) => CombinedStyleObj<S, BS, BSKey>;
export declare function createThemedUseStyleWithParams<T extends Themes, BS extends BaseStyles<BS> = undefined, BSKey extends string = 'bs'>(): <S extends Styles<S>, P>(styleCreator: StyleCreator<T, S, P>, params: P) => CombinedStyleObj<S, BS, BSKey>;
export declare function createThemedStyleCreator<T extends Themes>(styleCacheManager: StyleCacheManager<T, any, any>): <S extends Styles<S>, P>(styleCreator: StyleCreator<T, S, P>) => StyleCreator<T, S, P>;
export declare function createThemedUseStyleCreator<T extends Themes, BS extends BaseStyles<BS> = undefined, BSKey extends string = 'bs'>(styleCacheManager: StyleCacheManager<T, any, any>): <S extends Styles<S>, P = undefined>(styleCreator: StyleCreator<T, S, P>) => (...params: P extends undefined ? [] : [params: P]) => CombinedStyleObj<S, BS, BSKey>;
export declare function initThemeProvider<T extends Themes, BSKey extends string = 'bs', BS extends Styles<BS> = undefined, ThemeKey extends string = 't', TP = undefined>({ themes, initialTheme, onThemeChange, onThemeParamsChange, styleCacheManager, baseStylesCreator, initialThemeParams, baseStylesKey, themeKey, }: InitThemeProviderParams<T, BS, BSKey, ThemeKey, TP>): {
    ThemeProvider: ({ children, onThemeChange: propsOnThemeChange, onThemeParamsChange: propsOnThemeParamsChange, initialTheme: propsInitialTheme, baseStylesCreator: propsBaseStylesCreator, initialThemeParams: propsInitialThemeParams, themeKey: propsThemeKey, baseStylesKey: propsBaseStylesKey, }: {
        children: React.ReactNode;
    } & Partial<ThemeContextProps<T, BS, BSKey, ThemeKey, TP>>) => JSX.Element;
    ThemedProviderComponent: React.FunctionComponent<ThemeContextProps<T, BS, BSKey, ThemeKey, TP>>;
    createUseStyle: <S extends Styles<S>, P = undefined>(styleCreator: StyleCreator<T, S, P>) => (...params: P extends undefined ? [] : [params: P]) => CombinedStyleObj<S, BS, BSKey>;
    createStyle: <S_1 extends Styles<S_1>, P_1>(styleCreator: StyleCreator<T, S_1, P_1>) => StyleCreator<T, S_1, P_1>;
    useTheme: () => ThemeContextValue<T, ThemeKey, TP>;
    useThemeDispatch: () => ThemeDispatchContextValue<T, TP>;
    useStyle: <S_2 extends Styles<S_2>>(styleCreator: StyleCreator<T, S_2>) => CombinedStyleObj<S_2, BS, BSKey>;
    useStyleWithParams: <S_3 extends Styles<S_3>, P_2>(styleCreator: StyleCreator<T, S_3, P_2>, params: P_2) => CombinedStyleObj<S_3, BS, BSKey>;
};
