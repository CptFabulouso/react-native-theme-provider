import * as React from 'react';

import { useStyle } from './hooks';
import { Styles, StyleCreator, StyleObj } from './types';

export type WithStylesProps<S extends Styles<S>> = {
  styles: StyleObj<S>;
};

type InjectedProps<S> = WithStylesProps<S>;

export function withUseStyle<T extends InjectedProps<S>, S extends Styles<S>>(
  WrappedComponent: React.ComponentType<T>,
  useStyleParam: () => StyleObj<S>,
): React.FC<Omit<T, keyof InjectedProps<S>>>;
export function withUseStyle<
  T extends InjectedProps<S>,
  S extends Styles<S>,
  P,
>(
  WrappedComponent: React.ComponentType<T>,
  useStyleParam: (params: P) => StyleObj<S>,
  mapPropsToParams: (props: Omit<T, keyof InjectedProps<S>>) => P,
): React.FC<Omit<T, keyof InjectedProps<S>>>;

export function withUseStyle<
  T extends InjectedProps<S>,
  S extends Styles<S>,
  P,
>(
  WrappedComponent: React.ComponentType<T>,
  useStyleParam: (params?: P) => StyleObj<S>,
  mapPropsToParams?: (props: Omit<T, keyof InjectedProps<S>>) => P,
): React.FC<Omit<T, keyof InjectedProps<S>>> {
  return (props) => {
    const params = mapPropsToParams ? mapPropsToParams(props) : undefined;
    const styles = params ? useStyleParam(params) : useStyleParam();

    return <WrappedComponent {...(props as T)} styles={styles} />;
  };
}

export function withCreateStyle<
  T extends InjectedProps<S>,
  S extends Styles<S>,
>(
  WrappedComponent: React.ComponentType<T>,
  styleCreator: StyleCreator<any, S, undefined>,
): React.FC<Omit<T, keyof InjectedProps<S>>>;
export function withCreateStyle<
  T extends InjectedProps<S>,
  S extends Styles<S>,
  P,
>(
  WrappedComponent: React.ComponentType<T>,
  styleCreator: StyleCreator<any, S, P>,
  mapPropsToParams: (props: Omit<T, keyof InjectedProps<S>>) => P,
): React.FC<Omit<T, keyof InjectedProps<S>>>;
export function withCreateStyle<
  T extends InjectedProps<S>,
  S extends Styles<S>,
  P,
>(
  WrappedComponent: React.ComponentType<T>,
  styleCreator: (theme: any, p?: P) => StyleObj<S>,
  mapPropsToParams?: (props: Omit<T, keyof InjectedProps<S>>) => P,
): React.FC<Omit<T, keyof InjectedProps<S>>> {
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
