import * as React from 'react';

import { createStyle, createUseStyle, initThemeProvider } from '../creators';
import { useStyle } from '../hooks';
import { withCreateStyle, withUseStyle } from '../wrappers';

const themes = {
  light: {
    blue: 'blue',
  },
};

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

const { createStyle: themedCreateStyle, createUseStyle: themedCreateUseStyle } =
  initThemeProvider({ themes, initialTheme: 'light' });

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

/* WRAPPERS */

/* withUseStyle */

type ClassCompWithUseStyleProps = {
  styles: ReturnType<typeof useStyleTest>;
  val: string;
};
export class ClassCompUseStyle extends React.Component<ClassCompWithUseStyleProps> {
  render() {
    const { styles } = this.props;
    checkStyle([styles]);
    return null;
  }
}

export const ClassCompWithUseStyle = withUseStyle(
  ClassCompUseStyle,
  useStyleTest,
);
export const ClassCompWithUseStyleParamsMissing = withUseStyle(
  ClassCompUseStyle,
  // @ts-expect-error
  useStyleTestParams,
);
export const ClassCompWithUseStyleParams = withUseStyle(
  ClassCompUseStyle,
  useStyleTestParams,
  (props) => ({
    val: props.val,
  }),
);

/* withCreateStyle */

type ClassCompWithCreateStyleProps = {
  styles: ReturnType<typeof styleCreator>;
  val: string;
};

export class ClassCompCreateStyle extends React.Component<ClassCompWithCreateStyleProps> {
  render() {
    const { styles } = this.props;
    checkStyle([styles]);
    return null;
  }
}

export const ClassCompWithCreateStyle = withCreateStyle(
  ClassCompCreateStyle,
  styleCreator,
);

export const ClassCompWithCreateStyleParamsMissing = withCreateStyle(
  ClassCompCreateStyle,
  // @ts-expect-error
  styleCreatorParams,
);
export const ClassCompWithCreateStyleParams = withCreateStyle(
  ClassCompCreateStyle,
  styleCreatorParams,
  (props) => ({
    val: props.val,
  }),
);
