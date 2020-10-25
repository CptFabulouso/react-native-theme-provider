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

const createTypography = ({ colors }: Props) => ({
  h1: {
    fontSize: fontSizes.h1,
    color: colors.primary,
  },
  h2: {
    fontSize: fontSizes.h2,
    color: colors.primary,
  },
  h3: {
    fontSize: fontSizes.h3,
    color: colors.primary,
  },
  h4: {
    fontSize: fontSizes.h4,
    color: colors.primary,
  },
  h5: {
    fontSize: fontSizes.h5,
    color: colors.primary,
  },
  h6: {
    fontSize: fontSizes.h6,
    color: colors.primary,
  },
  subtitle1: {
    fontSize: fontSizes.large,
    color: colors.secondary,
  },
  subtitle2: {
    fontSize: fontSizes.medium,
    color: colors.secondary,
  },
  body1: {
    fontSize: fontSizes.large,
    color: colors.primary,
  },
  body2: {
    fontSize: fontSizes.medium,
    color: colors.secondary,
  },
  button: {
    fontSize: fontSizes.medium,
    color: colors.onPrimary,
  },
  caption: {
    fontSize: fontSizes.small,
    color: colors.primary,
  },
  overline: {
    fontSize: fontSizes.tiny,
    color: colors.primary,
  },
});

export type Theme = ReturnType<typeof createTheme>;
export type Typography = ReturnType<typeof createTypography>;
