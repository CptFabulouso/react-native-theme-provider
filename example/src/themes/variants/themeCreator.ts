import { StyleSheet } from 'react-native';

import { borderRadii, spacing } from '../res/dims';
import { fontSizes } from '../res/fonts';

type Color =
  | 'primary'
  | 'secondary'
  | 'surface'
  | 'onPrimary'
  | 'onSecondary'
  | 'onSurface'
  | 'primaryVariant'
  | 'secondaryVariant'
  | 'error';

type Props = {
  colors: Record<Color, string>;
};
export type ThemeParams = {
  fontSizeMultiplier: number;
};

export const createTheme = (props: Props) => (themeParams: ThemeParams) => {
  const adjustedFontSizes = createFontSizes(themeParams);
  return {
    colors: props.colors,
    typography: createTypography({ adjustedFontSizes, ...props }),
    fontSizes,
    spacing,
    borderRadii,
  };
};

const createFontSizes = (themeParams: ThemeParams) => {
  return Object.entries(fontSizes).reduce((acc, [key, fontSize]) => {
    return {
      ...acc,
      [key]: fontSize * themeParams.fontSizeMultiplier,
    };
  }, fontSizes);
};

const createTypography = ({
  colors,
  adjustedFontSizes,
}: Props & {
  adjustedFontSizes: typeof fontSizes;
}) =>
  StyleSheet.create({
    h1: {
      fontSize: adjustedFontSizes.h1,
      color: colors.primary,
      letterSpacing: -1.5,
      fontWeight: '300',
    },
    h2: {
      fontSize: adjustedFontSizes.h2,
      color: colors.primary,
      letterSpacing: -0.5,
      fontWeight: '300',
    },
    h3: {
      fontSize: adjustedFontSizes.h3,
      color: colors.primary,
      letterSpacing: 0,
      fontWeight: '400',
    },
    h4: {
      fontSize: adjustedFontSizes.h4,
      color: colors.primary,
      letterSpacing: 0.25,
      fontWeight: '400',
    },
    h5: {
      fontSize: adjustedFontSizes.h5,
      color: colors.primary,
      letterSpacing: 0,
      fontWeight: '400',
    },
    h6: {
      fontSize: adjustedFontSizes.h6,
      color: colors.primary,
      letterSpacing: 0.15,
      fontWeight: '500',
    },
    subtitle1: {
      fontSize: adjustedFontSizes.large,
      color: colors.secondary,
      letterSpacing: 0.15,
      fontWeight: '400',
    },
    subtitle2: {
      fontSize: adjustedFontSizes.medium,
      color: colors.secondary,
      letterSpacing: 0.1,
      fontWeight: '500',
    },
    body1: {
      fontSize: adjustedFontSizes.large,
      color: colors.primary,
      letterSpacing: 0.5,
      fontWeight: '500',
    },
    body2: {
      fontSize: adjustedFontSizes.medium,
      color: colors.secondary,
      letterSpacing: 0.25,
      fontWeight: '500',
    },
    button: {
      fontSize: adjustedFontSizes.medium,
      color: colors.onPrimary,
      letterSpacing: 1.25,
      fontWeight: '500',
    },
    caption: {
      fontSize: adjustedFontSizes.small,
      color: colors.primary,
      letterSpacing: 0.4,
      fontWeight: '500',
    },
    overline: {
      fontSize: adjustedFontSizes.tiny,
      color: colors.primary,
      letterSpacing: 1.5,
      fontWeight: '500',
    },
  });

export type Theme = ReturnType<typeof createTheme>;
export type Typography = ReturnType<typeof createTypography>;
