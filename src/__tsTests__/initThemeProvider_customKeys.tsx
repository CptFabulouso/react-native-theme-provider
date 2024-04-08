import React from 'react';

import { checkStyleWithBS, Themes, themes, ValidateShape } from './common';
import { createThemedBaseStylesCreator, initThemeProvider } from '../creators';

/* create globally available styles, see further how these can be accessed */
const baseStylesCreator = createThemedBaseStylesCreator<Themes>()((t) => ({
  page: {
    flex: 1,
    backgroundColor: t.blue,
  },
}));

/* Default keys */
const defaultKeysProps = initThemeProvider({
  themes,
  initialTheme: 'light',
  baseStylesCreator,
});

const defaultKeysThemedUseStyle = defaultKeysProps.createUseStyle((t) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: 'blue',
  },
}));

export const DefaultKeysApp = () => {
  return (
    <defaultKeysProps.ThemeProvider themes={themes} initialTheme="light">
      <DefaultKeysTestComponent />
    </defaultKeysProps.ThemeProvider>
  );
};

const DefaultKeysTestComponent = () => {
  const { t } = defaultKeysProps.useTheme();
  const styles = defaultKeysThemedUseStyle();

  checkStyleWithBS(styles);

  if (t) {
    //
  }
  return null;
};

/* Custom keys */
const customKeysProps = initThemeProvider({
  themes,
  initialTheme: 'light',
  baseStylesCreator,
  baseStylesKey: 'customBS',
  themeKey: 'customT',
});

const customKeysThemedUseStyle = customKeysProps.createUseStyle((t) => ({
  container: {
    backgroundColor: t.blue,
    borderBottomColor: 'blue',
  },
}));

export const CustomKeysApp = () => {
  return (
    <customKeysProps.ThemeProvider themes={themes} initialTheme="light">
      <CustomKeysTestComponent />
    </customKeysProps.ThemeProvider>
  );
};

const CustomKeysTestComponent = () => {
  const { customT } = customKeysProps.useTheme();
  const styles = customKeysThemedUseStyle();

  checkStyleWithCustomKeyBS(styles);

  if (customT) {
    //
  }
  return null;
};

const checkStyleWithCustomKeyBS = <
  T extends {
    container: {
      backgroundColor: string;
      borderBottomColor: string;
    };
    customBS: {
      page: {
        flex: number;
        backgroundColor: string;
      };
    };
  },
>(
  style: ValidateShape<
    T,
    {
      container: ValidateShape<
        T['container'],
        {
          backgroundColor: string;
          borderBottomColor: string;
        }
      >;
      customBS: ValidateShape<
        T['customBS'],
        {
          page: ValidateShape<
            T['customBS']['page'],
            {
              flex: number;
              backgroundColor: string;
            }
          >;
        }
      >;
    }
  >,
) => {
  return style;
};
