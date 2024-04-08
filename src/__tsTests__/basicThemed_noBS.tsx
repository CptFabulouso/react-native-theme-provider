import React from 'react';

import { checkStyle, themes, Themes, styleParams } from './common';
import { ThemeProvider } from '../ThemeContext';
import {
  createThemedStyleCreator,
  createThemedUseStyleCreator,
  createThemedDefaultCacheManager,
  createThemedUseStyle,
  createThemedUseStyleWithParams,
} from '../creators';

const cacheManager = createThemedDefaultCacheManager<Themes>(); // or create your own cacheManager

/* create globally available styles, see further how these can be accessed */

const themedUseStyle = createThemedUseStyle<Themes>();
const themedUseStyleParams = createThemedUseStyleWithParams<Themes>();
const themedCreateStyle = createThemedStyleCreator<Themes>(cacheManager);
const themedCreateUseStyle = createThemedUseStyleCreator<Themes>(cacheManager);

/* theme style creators */

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

/* theme use style creators */
const themedUseStyleCreator = themedCreateUseStyle((t) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: 'blue',
  },
}));

const themedUseStyleCreatorParams = themedCreateUseStyle(
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
  const styles = themedUseStyle(themedStyleCreator);
  const stylesParams = themedUseStyleParams(
    themedStyleCreatorParams,
    styleParams,
  );

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stylesParamsFail = themedUseStyle(themedStyleCreatorParams);

  checkStyle(styles);
  checkStyle(stylesParams);

  return null;
};

const ThemedUseStyles = () => {
  const styles = themedUseStyleCreator();
  const stylesParams = themedUseStyleCreatorParams(styleParams);

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stylesParamsFail = themedUseStyleCreatorParams();

  checkStyle(styles);
  checkStyle(stylesParams);

  return null;
};
