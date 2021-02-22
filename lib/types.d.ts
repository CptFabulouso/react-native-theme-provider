import * as React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
export declare type Theme = Record<string, any>;
export declare type Themes = Record<string, Theme>;
export declare type ExtractThemeNames<T extends Themes> = keyof T;
export declare type ExtractThemes<T extends Themes> = T[keyof T];
export declare type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
export declare type StyleObj<S extends NamedStyles<S> | NamedStyles<any>> = S;
export declare type ThemeContextValue<T extends Themes> = {
    selectedTheme: ExtractThemeNames<T>;
    themes: T;
    t: ExtractThemes<T>;
};
export declare type ThemeDispatchContextValue<T extends Themes> = {
    setTheme: (t: ExtractThemeNames<T>) => void;
};
export declare type ThemeContextProps<T extends Themes> = {
    children: React.ReactNode;
    initialTheme: ExtractThemeNames<T>;
    themes: T;
};
export declare type StyleCreator<T extends Themes, S extends NamedStyles<S> | NamedStyles<any>, P> = (theme: ExtractThemes<T>, params: P) => StyleObj<S>;
