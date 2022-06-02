import { Styles, BaseStyles, StyleCreator, CombinedStyleObj, ThemeContextValue, ThemeDispatchContextValue, Themes, ThemeBaseStylesContextValue } from './types';
export declare function useStyle<T extends Themes, S extends Styles<S>, BS extends BaseStyles<BS>>(styleCreator: StyleCreator<T, S>, params?: undefined): CombinedStyleObj<S, BS>;
export declare function useStyle<T extends Themes, S extends Styles<S>, BS extends BaseStyles<BS>, P>(styleCreator: StyleCreator<T, S, P>, params: P): CombinedStyleObj<S, BS>;
export declare function useTheme<T extends Themes, P>(): ThemeContextValue<T, P>;
export declare function useThemeBaseStyles<BS extends BaseStyles<BS>>(): ThemeBaseStylesContextValue<BS>;
export declare function useThemeDispatch<T extends Themes, P>(): ThemeDispatchContextValue<T, P>;
