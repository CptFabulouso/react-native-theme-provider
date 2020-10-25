import { createStyle } from '@themes';

export default createStyle((t) => ({
  container: {
    backgroundColor: t.colors.primary,
    padding: t.spacing.m,
  },
  label: t.typography.button,
}));
