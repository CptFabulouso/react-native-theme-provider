import { createUseStyle } from '@themes';

type Params = {
  disabled?: boolean | null;
};
export default createUseStyle((t, { disabled }: Params) => ({
  container: {
    backgroundColor: t.colors.primary,
    padding: t.spacing.m,
    opacity: disabled ? 0.5 : 1,
  },
  label: t.typography.button,
}));
