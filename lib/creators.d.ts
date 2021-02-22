import { NamedStyles, StyleCreator, StyleObj, Themes } from './types';
export declare function createUseTheme<T extends Themes>(): () => import("./types").ThemeContextValue<T>;
export declare function createUseThemeDispatch<T extends Themes>(): () => import("./types").ThemeDispatchContextValue<T>;
export declare function createStyle<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>>(fn: StyleCreator<T, S, undefined>): StyleCreator<T, S, undefined>;
export declare function createStyle<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>, P>(fn: StyleCreator<T, S, P>): StyleCreator<T, S, P>;
export declare function createUseStyle<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>>(styleCreator: StyleCreator<T, S, undefined>): () => StyleObj<S>;
export declare function createUseStyle<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>, P>(styleCreator: StyleCreator<T, S, P>): (params: P) => StyleObj<S>;
export declare function createThemedStyleCreator<T extends Themes>(): <S extends NamedStyles<any> | NamedStyles<S>, P>(styleCreator: StyleCreator<T, S, P>) => StyleCreator<T, S, P>;
export declare function createThemedUseStyleCreator<T extends Themes>(): <S extends NamedStyles<S> | NamedStyles<any>, P = undefined>(styleCreator: StyleCreator<T, S, P>) => P extends undefined ? () => StyleObj<S> : (params: P) => StyleObj<S>;
