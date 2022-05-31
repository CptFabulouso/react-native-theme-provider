import * as React from 'react';
import { Styles, StyleCreator, StyleObj } from './types';
export declare type WithStylesProps<S extends Styles<S>> = {
    styles: StyleObj<S>;
};
declare type InjectedProps<S> = WithStylesProps<S>;
export declare function withUseStyle<T extends InjectedProps<S>, S extends Styles<S>>(WrappedComponent: React.ComponentType<T>, useStyleParam: () => StyleObj<S>): React.FC<Omit<T, keyof InjectedProps<S>>>;
export declare function withUseStyle<T extends InjectedProps<S>, S extends Styles<S>, P>(WrappedComponent: React.ComponentType<T>, useStyleParam: (params: P) => StyleObj<S>, mapPropsToParams: (props: Omit<T, keyof InjectedProps<S>>) => P): React.FC<Omit<T, keyof InjectedProps<S>>>;
export declare function withCreateStyle<T extends InjectedProps<S>, S extends Styles<S>>(WrappedComponent: React.ComponentType<T>, styleCreator: StyleCreator<any, S, undefined>): React.FC<Omit<T, keyof InjectedProps<S>>>;
export declare function withCreateStyle<T extends InjectedProps<S>, S extends Styles<S>, P>(WrappedComponent: React.ComponentType<T>, styleCreator: StyleCreator<any, S, P>, mapPropsToParams: (props: Omit<T, keyof InjectedProps<S>>) => P): React.FC<Omit<T, keyof InjectedProps<S>>>;
export declare function createStylesWithProps<S extends Styles<S>, P>(fn: (props: P) => S): (props: P) => S;
export {};
