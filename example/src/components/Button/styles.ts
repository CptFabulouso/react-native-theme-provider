import { createUseStyle } from '@themes';

export default createUseStyle((t) => ({
  container: {
    backgroundColor: t.colors.primary,
    padding: t.spacing.m,
  },
  label: t.typography.button,
}));
