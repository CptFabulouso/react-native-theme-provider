import { NamedStyles, StyleCreator, StyleObj, ThemeContextValue, ThemeDispatchContextValue, Themes } from './types';
export declare function useStyle<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>>(styleCreator: StyleCreator<T, S, undefined>): StyleObj<S>;
export declare function useStyle<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>, P>(styleCreator: StyleCreator<T, S, P>, params: P, key?: string | number): StyleObj<S>;
export declare function useCachedStyle<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>>(styleCreator: StyleCreator<T, S, undefined>, key: string | number): StyleObj<S>;
export declare function useCachedStyle<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>, P>(styleCreator: StyleCreator<T, S, P>, key: string | number): StyleObj<S>;
export declare function useTheme<T extends Themes>(): ThemeContextValue<T>;
export declare function useThemeDispatch<T extends Themes>(): ThemeDispatchContextValue<T>;
