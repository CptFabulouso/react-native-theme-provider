import * as React from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export type Theme = Record<string, any>;
export type Themes = Record<string, Theme>;
export type ExtractThemeNames<T extends Themes> = keyof T;
export type ExtractThemes<T extends Themes> = T[keyof T];
export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export type StyleObj<S extends NamedStyles<S> | NamedStyles<any>> = S;

export type ThemeContextValue<T extends Themes> = {
  selectedTheme: ExtractThemeNames<T>;
  themes: T;
  t: ExtractThemes<T>;
};
export type ThemeDispatchContextValue<T extends Themes> = {
  setTheme: (t: ExtractThemeNames<T>) => void;
};

export type ThemeContextProps<T extends Themes> = {
  children: React.ReactNode;
  initialTheme: ExtractThemeNames<T>;
  themes: T;
};

export type StyleCreator<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
> = (theme: ExtractThemes<T>, params: P) => StyleObj<S>;

function getThemes<T extends Themes>(theme: T): T {
  return theme;
}

function useStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>
>(styleCreator: StyleCreator<T, S, undefined>): StyleObj<S>;
function useStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(styleCreator: StyleCreator<T, S, P>, params: P): StyleObj<S>;

function useStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(styleCreator: (theme: ExtractThemes<T>, p?: P) => StyleObj<S>, params?: P) {
  const themes = getThemes({ light: { var: 'bu' } });
  // @ts-ignore
  return styleCreator(themes, params);
}

function createStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>
>(fn: StyleCreator<T, S, undefined>): StyleCreator<T, S, undefined>;

function createStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(fn: StyleCreator<T, S, P>): StyleCreator<T, S, P>;

function createStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(
  fn: (themes: ExtractThemes<T>, params?: P) => StyleObj<S>,
): (themes: ExtractThemes<T>, params?: P) => StyleObj<S> {
  return fn;
}

function createStyleCreator<T extends Themes>() {
  return function <S extends NamedStyles<S> | NamedStyles<any>, P>(
    fn: StyleCreator<T, S, P>,
  ) {
    return createStyle<T, S, P>(fn);
  };
}

const styleCreator = createStyle((t) => ({
  container: {
    backgroundColor: t.blue,
  },
}));

const styleCreatorParams = createStyle((t, { val }: { val: string }) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: val,
  },
}));

type ThemesType = {
  light: {
    blue: 'blue';
  };
};

const themedCreateStyle = createStyleCreator<ThemesType>();

const themedStyleCreator = themedCreateStyle((t) => ({
  container: {
    backgroundColor: t.blue,
  },
}));

const themedStyleCreatorParams = themedCreateStyle(
  (t, params: { val: string }) => ({
    container: {
      backgroundColor: t.blue,
      borderBottomColor: params.val,
    },
  }),
);

export const Foo = () => {
  const styles = useStyle(styleCreator);
  const stylesParams = useStyle(styleCreatorParams);
  const stylesThemed = useStyle(themedStyleCreator);
  const stylesParamsThemed = useStyle(themedStyleCreatorParams);

  console.log({
    styles: styles.container,
    stylesParams: stylesParams.container,
    stylesThemed: stylesThemed.container,
    stylesParamsThemed: stylesParamsThemed.container,
  });
};
