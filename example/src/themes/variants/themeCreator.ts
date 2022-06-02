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

export const createTheme = (props: Props) => ({
  colors: props.colors,
  typography: createTypography(props),
  fontSizes,
  spacing,
  borderRadii,
});

const createTypography = ({ colors }: Props) =>
  StyleSheet.create({
    h1: {
      fontSize: fontSizes.h1,
      color: colors.primary,
      letterSpacing: -1.5,
      fontWeight: '300',
    },
    h2: {
      fontSize: fontSizes.h2,
      color: colors.primary,
      letterSpacing: -0.5,
      fontWeight: '300',
    },
    h3: {
      fontSize: fontSizes.h3,
      color: colors.primary,
      letterSpacing: 0,
      fontWeight: '400',
    },
    h4: {
      fontSize: fontSizes.h4,
      color: colors.primary,
      letterSpacing: 0.25,
      fontWeight: '400',
    },
    h5: {
      fontSize: fontSizes.h5,
      color: colors.primary,
      letterSpacing: 0,
      fontWeight: '400',
    },
    h6: {
      fontSize: fontSizes.h6,
      color: colors.primary,
      letterSpacing: 0.15,
      fontWeight: '500',
    },
    subtitle1: {
      fontSize: fontSizes.large,
      color: colors.secondary,
      letterSpacing: 0.15,
      fontWeight: '400',
    },
    subtitle2: {
      fontSize: fontSizes.medium,
      color: colors.secondary,
      letterSpacing: 0.1,
      fontWeight: '500',
    },
    body1: {
      fontSize: fontSizes.large,
      color: colors.primary,
      letterSpacing: 0.5,
      fontWeight: '500',
    },
    body2: {
      fontSize: fontSizes.medium,
      color: colors.secondary,
      letterSpacing: 0.25,
      fontWeight: '500',
    },
    button: {
      fontSize: fontSizes.medium,
      color: colors.onPrimary,
      letterSpacing: 1.25,
      fontWeight: '500',
    },
    caption: {
      fontSize: fontSizes.small,
      color: colors.primary,
      letterSpacing: 0.4,
      fontWeight: '500',
    },
    overline: {
      fontSize: fontSizes.tiny,
      color: colors.primary,
      letterSpacing: 1.5,
      fontWeight: '500',
    },
  });

export type Theme = ReturnType<typeof createTheme>;
export type Typography = ReturnType<typeof createTypography>;
