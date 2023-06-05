import {
  render as defaultRender,
  fireEvent,
  screen,
} from '@testing-library/react-native';
import * as React from 'react';

import {
  BaseStyleTextComponent,
  SwitchStylesButton,
  TextComponent,
  TextComponentWithParams,
} from './test-components';
import { createRenderWithThemeProvider } from './test-utils';
import { ThemeProvider, initialThemes } from './theme';

export const render: typeof defaultRender =
  createRenderWithThemeProvider(ThemeProvider);

describe('Style tests', () => {
  it('correctly renders styles without params', () => {
    render(<TextComponent id={0}>Test</TextComponent>);
    const comp = screen.getByTestId('text-0');
    expect(comp).toHaveStyle({
      color: initialThemes.light.colors.primary,
      fontSize: initialThemes.light.typography.h1.fontSize,
    });
  });

  it('correctly renders styles with params', () => {
    render(
      <TextComponentWithParams id={0} fontSize={10}>
        Test
      </TextComponentWithParams>,
    );
    const comp = screen.getByTestId('text-0');
    expect(comp).toHaveStyle({
      fontSize: 10,
    });
  });

  it('correctly switches styles', () => {
    render(
      <>
        <TextComponent id={0}>Test</TextComponent>
        <SwitchStylesButton
          onPress={({ useTheme, useThemeDispatch }) => {
            const { selectedTheme } = useTheme;
            const { setTheme } = useThemeDispatch;
            setTheme(selectedTheme === 'light' ? 'dark' : 'light');
          }}
        />
      </>,
    );
    const comp = screen.getByTestId('text-0');
    expect(comp).toHaveStyle({
      color: initialThemes.light.colors.primary,
      fontSize: initialThemes.light.typography.h1.fontSize,
    });
    fireEvent(screen.getByTestId('changeStylesButton'), 'press');
    expect(comp).toHaveStyle({
      color: initialThemes.dark.colors.primary,
      fontSize: initialThemes.dark.typography.h1.fontSize,
    });
  });

  it('correctly changes initialParams', () => {
    render(
      <>
        <TextComponent id={0}>Test</TextComponent>
        <SwitchStylesButton
          onPress={({ useTheme, useThemeDispatch }) => {
            const { themeParams } = useTheme;
            const { setThemeParams } = useThemeDispatch;
            setThemeParams({
              fontSizeMultiplier: themeParams.fontSizeMultiplier + 1,
            });
          }}
        />
      </>,
    );
    const comp = screen.getByTestId('text-0');
    expect(comp).toHaveStyle({
      fontSize: initialThemes.light.typography.h1.fontSize,
    });
    fireEvent(screen.getByTestId('changeStylesButton'), 'press');
    expect(comp).toHaveStyle({
      fontSize: initialThemes.light.typography.h1.fontSize * 2,
    });
  });

  it('correctly caches the return of createUseStyles without params', () => {
    render(
      <>
        <TextComponent id={0}>Test</TextComponent>
        <TextComponent id={1}>Test</TextComponent>
      </>,
    );
    const text1 = screen.getByTestId('text-0');
    const text2 = screen.getByTestId('text-1');
    expect(text1.props.style).toBe(text2.props.style);
  });

  it('returns different styles objects from createUseStyles with params', () => {
    render(
      <>
        <TextComponentWithParams id={0} fontSize={10}>
          Test
        </TextComponentWithParams>
        <TextComponentWithParams id={1} fontSize={15}>
          Test
        </TextComponentWithParams>
      </>,
    );
    const text1 = screen.getByTestId('text-0');
    const text2 = screen.getByTestId('text-1');
    expect(text1.props.style).not.toBe(text2.props.style);
  });

  it('returns baseStyles as a singleton', () => {
    render(
      <>
        <BaseStyleTextComponent id={0}>Test</BaseStyleTextComponent>
        <BaseStyleTextComponent id={1}>Test</BaseStyleTextComponent>
      </>,
    );
    const text1 = screen.getByTestId('text-0');
    const text2 = screen.getByTestId('text-1');
    expect(text1.props.style).toBe(text2.props.style);
  });
});
