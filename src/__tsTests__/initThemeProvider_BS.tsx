import React from 'react';

import { createThemedBaseStylesCreator, initThemeProvider } from '../creators';
import { useStyle } from '../hooks';
import { checkStyleWithBS, Themes, themes, styleParams } from './common';

/* create globally available styles, see further how these can be accessed */
const baseStylesCreator = createThemedBaseStylesCreator<Themes>()((t) => ({
  page: {
    flex: 1,
    backgroundColor: t.blue,
  },
}));

const {
  createStyle: themedCreateStyle,
  createUseStyle: themedCreateUseStyle,
  ThemeProvider,
  useStyle: useStyleThemed,
  useStyleWithParams: useStyleThemedWithParams,
} = initThemeProvider({ themes, initialTheme: 'light', baseStylesCreator });

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
  const styles = useStyleThemed(themedStyleCreator);
  const stylesParams = useStyleThemedWithParams(
    themedStyleCreatorParams,
    styleParams,
  );

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stylesParamsFail = useStyle(themedStyleCreatorParams);

  checkStyleWithBS(styles);
  checkStyleWithBS(stylesParams);

  return null;
};

const ThemedUseStyles = () => {
  const styles = themedUseStyle();
  const stylesParams = themedUseStyleParams(styleParams);

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stylesParamsFail = themedUseStyleParams();

  checkStyleWithBS(styles);
  checkStyleWithBS(stylesParams);

  return null;
};
