import { Typography, createUseStyle } from '@themes';

export default createUseStyle(
  (t, params: { type: keyof Typography | undefined }) => ({
    ...t.typography,
    styleByType: params.type ? t.typography[params.type] : {},
  }),
);
