import { NamedStyles, StyleCreator, StyleObj, Themes } from './types';
export declare function createUseTheme<T extends Themes>(): () => import("./types").ThemeContextValue<T>;
export declare function createUseThemeDispatch<T extends Themes>(): () => import("./types").ThemeDispatchContextValue<T>;
export declare function createStyle<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>>(fn: StyleCreator<T, S>): StyleCreator<T, S>;
export declare function createUseStyle<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>>(styleCreator: StyleCreator<T, S>): () => StyleObj<S>;
export declare function createStyleCreator<T extends Themes>(): <S extends NamedStyles<any> | NamedStyles<S>>(fn: StyleCreator<T, S>) => StyleCreator<T, S>;
export declare function createUseStyleCreator<T extends Themes>(): <S extends NamedStyles<any> | NamedStyles<S>>(fn: StyleCreator<T, S>) => () => S;
