import { CreateStyle, CreateUseStyle, Themes } from './types';
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

export function createUseStyleT<T extends Themes>(): CreateStyle<T> {
  const fn: CreateStyle<T> = (styleCreator: any) => (params?: any) =>
    useStyle(styleCreator, params);
  return fn;
}

export const createUseStyle: CreateUseStyle<any> = (styleCreator: any) => {
  return (params?: any) => useStyle(styleCreator, params);
};

export function createStyleCreator<T extends Themes>(): CreateStyle<T> {
  const createStyleThemed: CreateStyle<T> = (styleCreator: any) => styleCreator;
  return createStyleThemed;
}

export function createUseStyleCreator<T extends Themes>(): CreateUseStyle<T> {
  const createStyleThemed: CreateUseStyle<T> = (styleCreator: any) => (
    params?: any,
  ) => useStyle(styleCreator, params);
  return createStyleThemed;
}
