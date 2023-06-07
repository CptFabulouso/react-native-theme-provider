import { render as defaultRender, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { initThemeProvider } from '../creators';
import { createRenderWithThemeProvider } from './test-utils';
import { themes, baseStylesCreator, initialThemes } from './theme';

const noBSProps = initThemeProvider({
  themes,
  initialTheme: 'light',
});

const BSCustomKeyProps = initThemeProvider({
  themes,
  initialTheme: 'light',
  baseStylesCreator,
  baseStylesKey: 'customKey',
});

const renderNoBS: typeof defaultRender = createRenderWithThemeProvider(
  noBSProps.ThemeProvider,
);

const renderBSCustomKey: typeof defaultRender = createRenderWithThemeProvider(
  BSCustomKeyProps.ThemeProvider,
);

const useStylesNoBS = noBSProps.createUseStyle((theme) => ({
  container: {
    color: theme.colors.primary,
    fontSize: theme.typography.h1.fontSize,
  },
}));

const useStylesCustomBSKey = BSCustomKeyProps.createUseStyle((theme) => ({
  container: {
    color: theme.colors.primary,
    fontSize: theme.typography.h1.fontSize,
  },
}));

const NoBSComponent = () => {
  const styles = useStylesNoBS();

  return (
    <Text
      testID={'text'}
      // @ts-expect-error
      style={styles?.bs || undefined}
    >
      text
    </Text>
  );
};

const CustomBSKeyComponent = () => {
  const styles = useStylesCustomBSKey();

  return (
    <Text testID={'text'} style={styles.customKey.page}>
      text
    </Text>
  );
};

describe('Base styles tests', () => {
  it('does not contain baseStyles when baseStylesCreator is not provided', () => {
    renderNoBS(<NoBSComponent />);

    const comp = screen.getByTestId('text');
    expect(comp).toHaveStyle(undefined);
  });

  it('contains baseStyles under specified baseStyleKes', () => {
    renderBSCustomKey(<CustomBSKeyComponent />);

    const comp = screen.getByTestId('text');
    expect(comp).toHaveStyle({
      flex: 1,
      backgroundColor: initialThemes.light.colors.primary,
    });
  });
});
