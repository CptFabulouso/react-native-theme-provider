import { Styles, BaseStyles, StyleCreator, CombinedStyleObj, ThemeContextValue, ThemeDispatchContextValue, Themes, ThemeBaseStylesContextValue } from './types';
export declare function useStyle<T extends Themes, S extends Styles<S>, BS extends BaseStyles<BS>, BSKey extends string>(styleCreator: StyleCreator<T, S>, params?: undefined): CombinedStyleObj<S, BS, BSKey>;
export declare function useStyle<T extends Themes, S extends Styles<S>, BS extends BaseStyles<BS>, BSKey extends string, P>(styleCreator: StyleCreator<T, S, P>, params: P): CombinedStyleObj<S, BS, BSKey>;
export declare function useTheme<T extends Themes, TP>(): ThemeContextValue<T, TP>;
export declare function useThemeBaseStyles<BS extends BaseStyles<BS>, BSKey extends string>(): ThemeBaseStylesContextValue<BS, BSKey>;
export declare function useThemeDispatch<T extends Themes, TP>(): ThemeDispatchContextValue<T, TP>;
