import { render as defaultRender, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { createRenderWithThemeProvider } from './test-utils';
import { themes, initialThemes } from './theme';
import { initThemeProvider } from '../creators';

const defaultThemeKeyProps = initThemeProvider({
  themes,
  initialTheme: 'light',
});

const themeKeyProps = initThemeProvider({
  themes,
  initialTheme: 'light',
  themeKey: 'theme',
});

const themeKeyRender: typeof defaultRender = createRenderWithThemeProvider(
  themeKeyProps.ThemeProvider,
);

const defaultThemeKeyRender: typeof defaultRender =
  createRenderWithThemeProvider(defaultThemeKeyProps.ThemeProvider);

const ThemKeyTextComponent = () => {
  const { theme } = themeKeyProps.useTheme();

  return (
    <Text
      testID={'text'}
      style={{
        backgroundColor: theme.colors.primary,
      }}
    >
      text
    </Text>
  );
};

const DefaultThemKeyTextComponent = () => {
  const { t } = defaultThemeKeyProps.useTheme();

  return (
    <Text
      testID={'text'}
      style={{
        backgroundColor: t.colors.primary,
      }}
    >
      text
    </Text>
  );
};

describe('Themes key tests', () => {
  it('Uses and passes custom themeKey to useTheme()', () => {
    themeKeyRender(<ThemKeyTextComponent />);

    const comp = screen.getByTestId('text');
    expect(comp).toHaveStyle({
      backgroundColor: initialThemes.light.colors.primary,
    });
  });

  it('Uses and passes default `t` key to useTheme()', () => {
    defaultThemeKeyRender(<DefaultThemKeyTextComponent />);

    const comp = screen.getByTestId('text');
    expect(comp).toHaveStyle({
      backgroundColor: initialThemes.light.colors.primary,
    });
  });
});
