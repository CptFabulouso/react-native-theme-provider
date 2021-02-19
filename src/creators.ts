import { CreateStyle, CreateUseStyle, Themes } from './types';
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

export const createStyle: CreateStyle<any> = (styleCreator) => styleCreator;

export const createUseStyle: CreateUseStyle<any> = (styleCreator) => {
  return (params) => useStyle(styleCreator, params);
};

export function createStyleCreator<T extends Themes>(): CreateStyle<T> {
  const createStyleThemed: CreateStyle<T> = (styleCreator) => styleCreator;
  return createStyleThemed;
}

export function createUseStyleCreator<T extends Themes>(): CreateUseStyle<T> {
  return (styleCreator) => (params) => useStyle(styleCreator, params);
}

// testy

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
  const stylesUse = useStyleTest();
  const stylesUseParams = useStyleTestParams();

  console.log({
    styles,
    stylesParams,
    stylesUse,
    stylesUseParams,
  });
};
