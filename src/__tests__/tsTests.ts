import { NamedStyles, StyleCreator, StyleObj } from '../types';
import {
  createStyle,
  createThemedStyleCreator,
  // createThemedUseStyleCreator,
  createUseStyle,
} from '../creators';
import { useStyle } from '../hooks';

type Themes = {
  light: {
    blue: 'blue';
  };
};

// const createThemedUseStyleCreator = <
//   S extends NamedStyles<S> | NamedStyles<any>,
//   P
// >(
//   styleCreator: StyleCreator<Themes, S, P>,
// ) => createUseStyle<Themes, S, P>(styleCreator);

// function createThemedUseStyleCreator<T extends Themes>(): <
//   S extends NamedStyles<S> | NamedStyles<any>
// >(
//   styleCreator: StyleCreator<T, S, undefined>,
// ) => () => StyleObj<S>;

function createThemedUseStyleCreator<T extends Themes>(): <
  S extends NamedStyles<S> | NamedStyles<any>,
  P = undefined
>(
  styleCreator: StyleCreator<T, S, P>,
) => P extends undefined ? () => StyleObj<S> : (params: P) => StyleObj<S>;

function createThemedUseStyleCreator<T extends Themes>() {
  return function <S extends NamedStyles<S> | NamedStyles<any>, P>(
    styleCreator: StyleCreator<T, S, P>,
  ) {
    return createUseStyle<T, S, P>(styleCreator);
  };
}

const styleCreator = createStyle((t) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: 'blue',
  },
}));

const styleCreatorParams = createStyle((t, { val }: { val: string }) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: val,
  },
}));

const themedCreateStyle = createThemedStyleCreator<Themes>();

const themedStyleCreator = themedCreateStyle((t) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: 'blue',
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

const themedCreateUseStyle = createThemedUseStyleCreator<Themes>();

const themedUseStyle = themedCreateUseStyle((t) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: 'blue',
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
    borderBottomColor: 'blue',
  },
}));

const useStyleTestParams = createUseStyle((t, { val }: { val: string }) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: val,
  },
}));

const checkStyle = (
  styles: Array<{
    container: {
      backgroundColor: string;
      borderBottomColor: string;
    };
  }>,
) => {
  return styles;
};

export const Foo = () => {
  const styles = useStyle(styleCreator);
  // @ts-expect-error
  const stylesParams = useStyle(styleCreatorParams);
  const themedStyles = useStyle(themedStyleCreator);
  // @ts-expect-error
  const themedStylesParams = useStyle(themedStyleCreatorParams);
  const stylesUse = useStyleTest();
  // @ts-expect-error
  const stylesUseParams = useStyleTestParams();
  const themedStylesUse = themedUseStyle();
  // @ts-expect-error
  const themedStylesUseParams = themedUseStyleParams();

  checkStyle([
    styles,
    stylesParams,
    themedStyles,
    themedStylesParams,
    stylesUse,
    stylesUseParams,
    themedStylesUse,
    themedStylesUseParams,
  ]);
};
