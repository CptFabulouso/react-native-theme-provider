import { NamedStyles, StyleCreator, StyleObj, Themes } from './types';
import { useStyle, useTheme, useThemeDispatch } from './hooks';

export function createUseTheme<T extends Themes>() {
  return function () {
    return useTheme<T>();
  };
}

export function createUseThemeDispatch<T extends Themes>() {
  return function () {
    return useThemeDispatch<T>();
  };
}

export function createStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>
>(fn: StyleCreator<T, S, undefined>): StyleCreator<T, S, undefined>;

export function createStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(fn: StyleCreator<T, S, P>): StyleCreator<T, S, P>;

export function createStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(fn: StyleCreator<T, S, P>): StyleCreator<T, S, P> {
  return fn;
}

export function createUseStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>
>(styleCreator: StyleCreator<T, S, undefined>): () => StyleObj<S>;

export function createUseStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(styleCreator: StyleCreator<T, S, P>): (params: P) => StyleObj<S>;

export function createUseStyle<
  T extends Themes,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(styleCreator: StyleCreator<T, S, P>) {
  return (params: P) => useStyle(styleCreator, params);
}

export function createStyleCreator<T extends Themes>() {
  return function <S extends NamedStyles<S> | NamedStyles<any>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createStyle<T, S, P>(styleCreator);
  };
}

export function createUseStyleCreator<T extends Themes>() {
  return function <S extends NamedStyles<S> | NamedStyles<any>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createUseStyle<T, S, P>(styleCreator);
  };
}

// testy

type ThemesT = {
  light: {
    blue: 'blue';
  };
};

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

const themedCreateStyle = createStyleCreator<ThemesT>();

const themedStyleCreator = themedCreateStyle((t) => ({
  container: {
    backgroundColor: t.blue,
  },
}));

const themedStyleCreatorParams = themedCreateStyle(
  (t, { val }: { val: string }) => ({
    container: {
      backgroundColor: t.blue,
      borderBottomColor: val,
    },
  }),
);

const themedCreateUseStyle = createUseStyleCreator<ThemesT>();

const themedUseStyle = themedCreateUseStyle((t) => ({
  container: {
    backgroundColor: t.blue,
  },
}));

const themedUseStyleParams = themedCreateUseStyle(
  (t, { val }: { val: string }) => ({
    container: {
      backgroundColor: t.blue,
      borderBottomColor: val,
    },
  }),
);

const useStyleTest = createUseStyle((t) => ({
  container: {
    backgroundColor: t.blue,
  },
}));

const useStyleTestParams = createUseStyle((t, { val }: { val: string }) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: val,
  },
}));

export const Buu = () => {
  const styles = useStyle(styleCreator);
  const stylesParams = useStyle(styleCreatorParams);
  const themedStyles = useStyle(themedStyleCreator);
  const themedStylesParams = useStyle(themedStyleCreatorParams);
  const stylesUse = useStyleTest();
  const stylesUseParams = useStyleTestParams();
  const themedStylesUse = themedUseStyle();
  const themedStylesUseParams = themedUseStyleParams();

  console.log({
    styles: styles.container,
    stylesParams: stylesParams.container,
    stylesUse: stylesUse.container,
    stylesUseParams: stylesUseParams.container,
    themedStyles: themedStyles.container,
    themedStylesParams: themedStylesParams.container,
    themedStylesUse: themedStylesUse.container,
    themedStylesUseParams: themedStylesUseParams.container,
  });
};
