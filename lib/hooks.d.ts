import { NamedStyles, StyleCreator, StyleObj, ThemeContextValue, ThemeDispatchContextValue, Themes } from './types';
export declare function useStyle<S extends NamedStyles<S> | NamedStyles<any>>(styleCreator: StyleCreator<any, S>): StyleObj<S>;
export declare function useTheme<T extends Themes>(): ThemeContextValue<T>;
export declare function useThemeDispatch<T extends Themes>(): ThemeDispatchContextValue<T>;
