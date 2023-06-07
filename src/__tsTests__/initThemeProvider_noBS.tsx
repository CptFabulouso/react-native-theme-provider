import React from 'react';

import { initThemeProvider } from '../creators';
import { useStyle } from '../hooks';
import { checkStyle, themes, styleParams } from './common';

const {
  createStyle: themedCreateStyle,
  createUseStyle: themedCreateUseStyle,
  ThemeProvider,
} = initThemeProvider({ themes, initialTheme: 'light' });

/* style creators */
const themedStyleCreator = themedCreateStyle((t) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: 'blue',
  },
}));

const themedStyleCreatorParams = themedCreateStyle(
  (t, { val }: { val: string }) => ({
    container: {
      backgroundColor: t.blue,
      borderBottomColor: val,
    },
  }),
);

/* use style creators */
const themedUseStyle = themedCreateUseStyle((t) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: 'blue',
  },
}));

const themedUseStyleParams = themedCreateUseStyle(
  (t, { val }: { val: string }) => ({
    container: {
      backgroundColor: t.blue,
      borderBottomColor: val,
    },
  }),
);

export const App = () => {
  return (
    <ThemeProvider themes={themes} initialTheme="light">
      <ThemedStyles />
      <ThemedUseStyles />
    </ThemeProvider>
  );
};

const ThemedStyles = () => {
  const styles = useStyle(themedStyleCreator);
  const stylesParams = useStyle(themedStyleCreatorParams, styleParams);

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stylesParamsFail = useStyle(themedStyleCreatorParams);

  checkStyle(styles);
  checkStyle(stylesParams);

  return null;
};

const ThemedUseStyles = () => {
  const styles = themedUseStyle();
  const stylesParams = themedUseStyleParams(styleParams);

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stylesParamsFail = themedUseStyleParams();

  checkStyle(styles);
  checkStyle(stylesParams);

  return null;
};
