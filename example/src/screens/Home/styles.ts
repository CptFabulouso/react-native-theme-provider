import { createUseStyle } from '@themes';

export default createUseStyle((t) => ({
  container: {
    backgroundColor: t.colors.surface,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
}));
