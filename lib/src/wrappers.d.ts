import * as React from 'react';
import { Styles, StyleCreator, CombinedStyleObj } from './types';
export type WithStylesProps = {
    styles: CombinedStyleObj<any, any, string>;
};
type InjectedProps = WithStylesProps;
export declare function withUseStyle<TProps, T extends InjectedProps>(WrappedComponent: React.ComponentType<TProps>, useStyleParam: () => CombinedStyleObj<any, any, string>): React.FC<Omit<TProps, keyof T>>;
export declare function withUseStyle<TProps, T extends InjectedProps, P>(WrappedComponent: React.ComponentType<TProps>, useStyleParam: (params: P) => CombinedStyleObj<any, any, string>, mapPropsToParams: (props: Omit<TProps, keyof T>) => P): React.FC<Omit<TProps, keyof T>>;
export declare function withCreateStyle<TProps, S extends Styles<S>, T extends InjectedProps>(WrappedComponent: React.ComponentType<TProps>, styleCreator: StyleCreator<any, S, undefined>): React.FC<Omit<T, keyof InjectedProps>>;
export declare function withCreateStyle<TProps, S extends Styles<S>, T extends InjectedProps, P>(WrappedComponent: React.ComponentType<TProps>, styleCreator: StyleCreator<any, S, P>, mapPropsToParams: (props: Omit<TProps, keyof T>) => P): React.FC<Omit<T, keyof T>>;
export declare function createStylesWithProps<S extends Styles<S>, P>(fn: (props: P) => S): (props: P) => S;
export {};
