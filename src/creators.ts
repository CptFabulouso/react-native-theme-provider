import {
  CreateStyle,
  CreateUseStyle,
  NamedStyles,
  StyleCreator,
  StyleCreatorWithParams,
  StyleObj,
  Themes,
} from './types';
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

export const createStyle: CreateStyle<any> = (styleCreator: any) =>
  styleCreator;

export function createUseStyleT<T extends Themes>() {
  const fn: CreateStyle<T> = (styleCreator: any) => (params?: any) =>
    useStyle(styleCreator, params);
  return fn;
}

export const createUseStyle: CreateUseStyle<any> = (styleCreator: any) => {
  return (params?: any) => useStyle(styleCreator, params);
};

// export function createStyleCreatorOld<T extends Themes>() {
//   return function <S extends NamedStyles<S> | NamedStyles<any>, P>(
//     fn: StyleCreator<T, S, P>,
//   ): StyleCreator<T, S, P> {
//     return createStyle<T, S, P>(fn);
//   };
// }

export function createStyleCreator<T extends Themes>() {
  const createStyleThemed: CreateStyle<T> = (styleCreator: any, params?: any) =>
    styleCreator;
  return createStyleThemed;
}

// export function createUseStyleCreator<T extends Themes>() {
//   return function <P>(fn: StyleCreator<T, any, P>): UseStyleCreator<any, P> {
//     return createUseStyle(createStyle<T, any, P>(fn));
//   };
// }

type Themes = { light: { color: 'blue' } };
type Theme = { color: 'blue' };

const styleCreatorNoParams: StyleCreator<Themes, any> = (t) => ({
  container: {
    backgroundColor: t.color,
  },
});
const styleCreatorWithParams: StyleCreatorWithParams<Themes, any> = (t) => ({
  container: {
    backgroundColor: t.color,
  },
});

const themedCreateStyle = createStyleCreator<Themes>();

const style = createStyle((t: Theme) => ({
  container: {
    backgroundColor: t.color,
  },
}));

const styleWP = createStyle((t: Theme, { val }: { val: string }) => ({
  container: {
    backgroundColor: t.color,
    borderBottomColor: val,
  },
}));

const themedStyleCreatorWithParams = themedCreateStyle(
  (t, { val }: { val: string }) => ({
    container: {
      backgroundColor: t.color,
      borderBottomColor: val,
    },
  }),
);

const themedStyleCreatorNoParams = themedCreateStyle((t) => ({
  container: {
    backgroundColor: t.color,
  },
}));

const useStyleWithParams = createUseStyle(
  (t: Theme, { val }: { val: string }) => ({
    container: {
      backgroundColor: t.color,
      borderBottomColor: val,
    },
  }),
);

const useStyleNoParams = createUseStyle((t: Theme) => ({
  container: {
    backgroundColor: t.color,
  },
}));

const Buu = () => {
  const styles = useStyleWithParams({ val: 'blue', bar: 'test' });
  const styles = useStyleWithParams({});
  const styles = useStyleNoParams({ val: 'blue' });
  const styles = useStyle(themedStyleCreatorWithParams, {
    val: 'test',
    bar: 'test',
  });
  const styles = useStyle(themedStyleCreatorWithParams);
  const styles = useStyle(themedStyleCreatorNoParams, { val: 'test' });
  const styles = useStyle(themedStyleCreatorNoParams);
};
