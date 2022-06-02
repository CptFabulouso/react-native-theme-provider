import React from 'react';

import { ThemeProvider } from '../ThemeContext';
import {
  createThemedStyleCreator,
  createThemedUseStyleCreator,
  createThemedBaseStylesCreator,
  createThemedDefaultCacheManager,
  createThemedUseStyle,
  createThemedUseStyleWithParams,
} from '../creators';
import { checkStyleWithBS, themes, Themes, styleParams } from './common';

const cacheManager = createThemedDefaultCacheManager<Themes>(); // or create your own cacheManager

/* create globally available styles, see further how these can be accessed */
const baseStylesCreator = createThemedBaseStylesCreator<Themes>()((t) => ({
  page: {
    flex: 1,
    backgroundColor: t.blue,
  },
}));

const themedUseStyle = createThemedUseStyle<
  Themes,
  ReturnType<typeof baseStylesCreator>
>();
const themedUseStyleParams = createThemedUseStyleWithParams<
  Themes,
  ReturnType<typeof baseStylesCreator>
>();
const themedCreateStyle = createThemedStyleCreator<Themes>(cacheManager);
const themedCreateUseStyle = createThemedUseStyleCreator<
  Themes,
  ReturnType<typeof baseStylesCreator>
>(cacheManager);

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

  checkStyleWithBS(styles);
  checkStyleWithBS(stylesParams);

  return null;
};

const ThemedUseStyles = () => {
  const styles = themedUseStyleCreator();
  const stylesParams = themedUseStyleCreatorParams(styleParams);

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stylesParamsFail = themedUseStyleCreatorParams();

  checkStyleWithBS(styles);
  checkStyleWithBS(stylesParams);

  return null;
};
