import * as React from 'react';

import { checkStyle } from './common';
import { createUseStyle, createStyle } from '../creators';
import { withCreateStyle, withUseStyle } from '../wrappers';

/* style creators */
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

/* use style creators */
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

/* withUseStyle */
type ClassCompWithUseStyleProps = {
  styles: ReturnType<typeof useStyleTest>;
  val: string;
};
export class ClassCompUseStyle extends React.Component<ClassCompWithUseStyleProps> {
  render() {
    const { styles } = this.props;
    checkStyle(styles);
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
    checkStyle(styles);
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
