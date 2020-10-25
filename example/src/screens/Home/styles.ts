import { createStyle } from '@themes';

export default createStyle((t) => ({
  container: {
    backgroundColor: t.colors.surface,
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
