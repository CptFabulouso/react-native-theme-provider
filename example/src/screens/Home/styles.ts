import { createUseStyle } from '@themes';

export default createUseStyle((t) => ({
  container: {
    backgroundColor: t.colors.surface,
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
