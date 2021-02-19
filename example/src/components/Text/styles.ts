import { Theme, Typography, createUseStyle } from '@themes';

export default createUseStyle(
  (t: Theme, params: { type: keyof Typography | undefined }) => ({
    ...t.typography,
    styleByType: params.type ? t.typography[params.type] : {},
  }),
);
