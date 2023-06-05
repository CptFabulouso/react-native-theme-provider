import {
  render as defaultRender,
  RenderOptions,
} from '@testing-library/react-native';
import React from 'react';

import { ThemeProvider, Themes, Styles, ThemeContextProps } from '..';

export const createRenderWithThemeProvider = (
  ThemeProviderComponent: React.ComponentType<any>,
) => {
  return (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
  ): ReturnType<typeof defaultRender> =>
    defaultRender(ui, { wrapper: ThemeProviderComponent, ...options });
};

export const createRenderWithProps = <
  T extends Themes,
  BS extends Styles<BS>,
  BSKey extends string,
  TP,
>(
  props: Omit<ThemeContextProps<T, BS, BSKey, TP>, 'children'>,
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider {...props}>{children}</ThemeProvider>;
  };

  return (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
  ): ReturnType<typeof defaultRender> =>
    defaultRender(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react-native';
