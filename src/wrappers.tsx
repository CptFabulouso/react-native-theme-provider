import * as React from 'react';

import { useStyle } from './hooks';
import {
  Styles,
  StyleCreator,
  StyleObj,
  BaseStyles,
  CombinedStyleObj,
} from './types';

export type WithStylesProps<S extends Styles<S>, BS extends BaseStyles<BS>> = {
  styles: CombinedStyleObj<S, BS>;
};

type InjectedProps<S, BS> = WithStylesProps<S, BS>;

export function withUseStyle<
  T extends InjectedProps<S, BS>,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
>(
  WrappedComponent: React.ComponentType<T>,
  useStyleParam: () => CombinedStyleObj<S, BS>,
): React.FC<Omit<T, keyof InjectedProps<S, BS>>>;
export function withUseStyle<
  T extends InjectedProps<S, BS>,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  P,
>(
  WrappedComponent: React.ComponentType<T>,
  useStyleParam: (params: P) => CombinedStyleObj<S, BS>,
  mapPropsToParams: (props: Omit<T, keyof InjectedProps<S, BS>>) => P,
): React.FC<Omit<T, keyof InjectedProps<S, BS>>>;

export function withUseStyle<
  T extends InjectedProps<S, BS>,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  P,
>(
  WrappedComponent: React.ComponentType<T>,
  useStyleParam: (params?: P) => CombinedStyleObj<S, BS>,
  mapPropsToParams?: (props: Omit<T, keyof InjectedProps<S, BS>>) => P,
): React.FC<Omit<T, keyof InjectedProps<S, BS>>> {
  return (props) => {
    const params = mapPropsToParams ? mapPropsToParams(props) : undefined;
    const styles = params ? useStyleParam(params) : useStyleParam();

    return <WrappedComponent {...(props as T)} styles={styles} />;
  };
}

export function withCreateStyle<
  T extends InjectedProps<S, BS>,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
>(
  WrappedComponent: React.ComponentType<T>,
  styleCreator: StyleCreator<any, S, undefined>,
): React.FC<Omit<T, keyof InjectedProps<S, BS>>>;
export function withCreateStyle<
  T extends InjectedProps<S, BS>,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  P,
>(
  WrappedComponent: React.ComponentType<T>,
  styleCreator: StyleCreator<any, S, P>,
  mapPropsToParams: (props: Omit<T, keyof InjectedProps<S, BS>>) => P,
): React.FC<Omit<T, keyof InjectedProps<S, BS>>>;
export function withCreateStyle<
  T extends InjectedProps<S, BS>,
  S extends Styles<S>,
  BS extends BaseStyles<BS>,
  P,
>(
  WrappedComponent: React.ComponentType<T>,
  styleCreator: (theme: any, p?: P) => StyleObj<S>,
  mapPropsToParams?: (props: Omit<T, keyof InjectedProps<S, BS>>) => P,
): React.FC<Omit<T, keyof InjectedProps<S, BS>>> {
  return (props) => {
    const params = mapPropsToParams ? mapPropsToParams(props) : undefined;
    const styles = params
      ? useStyle(styleCreator, params)
      : useStyle(styleCreator);

    return <WrappedComponent {...(props as T)} styles={styles} />;
  };
}

export function createStylesWithProps<S extends Styles<S>, P>(
  fn: (props: P) => S,
) {
  return function (props: P) {
    return fn(props);
  };
}
