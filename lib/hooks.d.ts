import { Styles, StyleCreator, StyleObj, ThemeContextValue, ThemeDispatchContextValue, Themes } from './types';
export declare function useStyle<T extends Themes, S extends Styles<S>>(styleCreator: StyleCreator<T, S>, params?: undefined): StyleObj<S>;
export declare function useStyle<T extends Themes, S extends Styles<S>, P>(styleCreator: StyleCreator<T, S, P>, params: P): StyleObj<S>;
export declare function useTheme<T extends Themes>(): ThemeContextValue<T>;
export declare function useThemeDispatch<T extends Themes>(): ThemeDispatchContextValue<T>;
