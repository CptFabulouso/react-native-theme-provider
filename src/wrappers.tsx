import * as React from 'react';

import { useStyle } from './hooks';
import { Styles, StyleCreator, StyleObj, CombinedStyleObj } from './types';

export type WithStylesProps = {
  styles: CombinedStyleObj<any, any>;
};

type InjectedProps = WithStylesProps;

export function withUseStyle<TProps, T extends InjectedProps>(
  WrappedComponent: React.ComponentType<TProps>,
  useStyleParam: () => CombinedStyleObj<any, any>,
): React.FC<Omit<TProps, keyof T>>;
export function withUseStyle<TProps, T extends InjectedProps, P>(
  WrappedComponent: React.ComponentType<TProps>,
  useStyleParam: (params: P) => CombinedStyleObj<any, any>,
  mapPropsToParams: (props: Omit<TProps, keyof T>) => P,
): React.FC<Omit<TProps, keyof T>>;

export function withUseStyle<TProps, T extends InjectedProps, P>(
  WrappedComponent: React.ComponentType<TProps>,
  useStyleParam: (params?: P) => CombinedStyleObj<any, any>,
  mapPropsToParams?: (props: Omit<TProps, keyof T>) => P,
): React.FC<Omit<TProps, keyof T>> {
  return (props) => {
    const params = mapPropsToParams ? mapPropsToParams(props) : undefined;
    const styles = params ? useStyleParam(params) : useStyleParam();

    return <WrappedComponent {...(props as TProps)} styles={styles} />;
  };
}

export function withCreateStyle<
  TProps,
  S extends Styles<S>,
  T extends InjectedProps,
>(
  WrappedComponent: React.ComponentType<TProps>,
  styleCreator: StyleCreator<any, S, undefined>,
): React.FC<Omit<T, keyof InjectedProps>>;
export function withCreateStyle<
  TProps,
  S extends Styles<S>,
  T extends InjectedProps,
  P,
>(
  WrappedComponent: React.ComponentType<TProps>,
  styleCreator: StyleCreator<any, S, P>,
  mapPropsToParams: (props: Omit<TProps, keyof T>) => P,
): React.FC<Omit<T, keyof T>>;
export function withCreateStyle<
  TProps,
  T extends InjectedProps,
  S extends Styles<S>,
  P,
>(
  WrappedComponent: React.ComponentType<TProps>,
  styleCreator: (theme: any, p?: P) => StyleObj<S>,
  mapPropsToParams?: (props: Omit<TProps, keyof T>) => P,
): React.FC<Omit<TProps, keyof T>> {
  return (props) => {
    const params = mapPropsToParams ? mapPropsToParams(props) : undefined;
    const styles = params
      ? useStyle(styleCreator, params)
      : useStyle(styleCreator);

    return <WrappedComponent {...(props as TProps)} styles={styles} />;
  };
}

export function createStylesWithProps<S extends Styles<S>, P>(
  fn: (props: P) => S,
) {
  return function (props: P) {
    return fn(props);
  };
}
