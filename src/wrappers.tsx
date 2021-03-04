import { NamedStyles, StyleCreator, StyleObj } from './types';
import { useCachedStyle, useStyle } from './hooks';
import React, { ComponentType } from 'react';

export type WithStylesProps<S extends NamedStyles<S> | NamedStyles<any>> = {
  styles: StyleObj<S>;
};

type InjectedProps<S> = WithStylesProps<S>;

export function withUseStyle<
  T extends InjectedProps<S>,
  S extends NamedStyles<S> | NamedStyles<any>
>(
  WrappedComponent: ComponentType<T>,
  useStyleParam: () => StyleObj<S>,
): React.FC<Omit<T, keyof InjectedProps<S>>>;
export function withUseStyle<
  T extends InjectedProps<S>,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(
  WrappedComponent: ComponentType<T>,
  useStyleParam: (params: P) => StyleObj<S>,
  mapPropsToParams: (props: Omit<T, keyof InjectedProps<S>>) => P,
): React.FC<Omit<T, keyof InjectedProps<S>>>;

export function withUseStyle<
  T extends InjectedProps<S>,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(
  WrappedComponent: ComponentType<T>,
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
  S extends NamedStyles<S> | NamedStyles<any>
>(
  WrappedComponent: ComponentType<T>,
  styleCreator: StyleCreator<any, S, undefined>,
): React.FC<Omit<T, keyof InjectedProps<S>>>;
export function withCreateStyle<
  T extends InjectedProps<S>,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(
  WrappedComponent: ComponentType<T>,
  styleCreator: StyleCreator<any, S, P>,
  mapPropsToParams: (props: Omit<T, keyof InjectedProps<S>>) => P,
  key?: string | number,
): React.FC<Omit<T, keyof InjectedProps<S>>>;
export function withCreateStyle<
  T extends InjectedProps<S>,
  S extends NamedStyles<S> | NamedStyles<any>,
  P
>(
  WrappedComponent: ComponentType<T>,
  styleCreator: (theme: any, p?: P) => StyleObj<S>,
  mapPropsToParams?: (props: Omit<T, keyof InjectedProps<S>>) => P,
  key?: string | number,
): React.FC<Omit<T, keyof InjectedProps<S>>> {
  return (props) => {
    const params = mapPropsToParams ? mapPropsToParams(props) : undefined;
    const styles = params
      ? useStyle(styleCreator, params, key)
      : key
      ? useCachedStyle(styleCreator, key)
      : useStyle(styleCreator);

    return <WrappedComponent {...(props as T)} styles={styles} />;
  };
}
