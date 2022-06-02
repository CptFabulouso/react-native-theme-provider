# React Native Theme Provider

- [React Native Theme Provider](#react-native-theme-provider)
  - [Installation](#installation)
  - [Usage](#usage)
    - [with initThemeProvider (Recommended)](#with-initthemeprovider-recommended)
      - [Initialize themes and the theme provider](#initialize-themes-and-the-theme-provider)
      - [Wrap your app with exported ThemeProvider](#wrap-your-app-with-exported-themeprovider)
      - [Create style for component](#create-style-for-component)
      - [Change or access theme](#change-or-access-theme)
    - [Usage without initThemeProvider](#usage-without-initthemeprovider)
      - [Wrap your app with ThemeProvider](#wrap-your-app-with-themeprovider)
    - [Usage without any helpers](#usage-without-any-helpers)
  - [Passing params to style creator](#passing-params-to-style-creator)
    - [Passing params examples](#passing-params-examples)
  - [Passing and accessing default styles](#passing-and-accessing-default-styles)
  - [Exported functions](#exported-functions)
    - [`initThemeProvider`](#initthemeprovider)
    - [`createStyle`](#createstyle)
    - [`useStyle`](#usestyle)
    - [`createUseStyle`](#createusestyle)
    - [`useTheme`](#usetheme)
    - [`useThemeDispatch`](#usethemedispatch)
    - [`createThemedStyleCreator`](#createthemedstylecreator)
    - [`createThemedUseStyleCreator`](#createthemedusestylecreator)
    - [`createThemedUseTheme`](#createthemedusetheme)
    - [`createThemedUseThemeDispatch`](#createthemedusethemedispatch)
    - [`createThemedUseStyle`](#createthemedusestyle)
    - [`createThemedUseStyleWithParams`](#createthemedusestylewithparams)
  - [Helper functions](#helper-functions)
    - [`createStylesWithProps`](#createstyleswithprops)
  - [Wrappers](#wrappers)
    - [`withUseStyle(Component, useStyleFunc, [mapPropsToParams])`](#withusestylecomponent-usestylefunc-mappropstoparams)
    - [`withCreateStyle(Component, createStyleFunc, [mapPropsToParams])`](#withcreatestylecomponent-createstylefunc-mappropstoparams)
  - [Caching](#caching)
    - [Default Cache manager](#default-cache-manager)
    - [Providing your own cache manager](#providing-your-own-cache-manager)
      - [**onProviderMount**](#onprovidermount)
      - [**onThemeChange**](#onthemechange)
      - [**onCacheStyleCreator**](#oncachestylecreator)
      - [onCacheStyleCreator](#oncachestylecreator-1)
  - [Recommendations](#recommendations)
  - [Example](#example)
  - [TODO:](#todo)

## Installation

`yarn add @pavelgric/react-native-theme-provider`

## Usage

### with initThemeProvider (Recommended)

#### Initialize themes and the theme provider

The library provides few functions to help passing down the Theme type

Define your themes and use creator functions

```ts
// themes.ts
import {
  initThemeProvider
  createThemedStyleCreator,
  createThemedUseStyleCreator,
  createThemedUseTheme,
  createThemedUseThemeDispatch,
  createThemedBaseStylesCreator,
  useStyle,
} from '@pavelgric/react-native-theme-provider';

const blueTheme = {
  colors: {
    primary: 'blue'
  }
}

const redTheme = {
  colors: {
    primary: 'red'
  }
}

// you can have as many themes as you want and their names are up to you
export const themes = {
  blue: blueTheme,
  red: redTheme,
};

/* create globally available styles, see further how these can be accessed */
export const baseStylesCreator = createThemedBaseStylesCreator<Themes>()((t) => ({
  page: {
    flex: 1,
    backgroundColor: t.colors.surface,
  },
  flex: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
export type Themes = typeof themes;
export const {
  createUseStyle,
  createStyle,
  useTheme,
  useThemeDispatch,
  ThemeProvider,
  /* 
   * If you want to be able to use `const styles = useStyle(styleCreator, params)`, you currently need to export and use these to work with typescript correctly.
   * Otherwise use the `export { useStyle };` below. 
  */
  // use for `const styles = useStyleThemed(styleCreator)`
 useStyle: useStyleThemed,
  // use for `const styles = useStyleThemedWithParams(styleCreator, params)`
  useStyleWithParams: useStyleThemedWithParams,
} = initThemeProvider({ themes, initialTheme: 'red', baseStylesCreator });

// useStyle does not depend on Theme, this is just to make it also accessible from here. But you'll probably not gonna use this anyway
export { useStyle };
```

#### Wrap your app with exported ThemeProvider

```js
import { ThemedProvider } from './path/to/themes.ts';
import { useColorScheme } from 'react-native';

export default App = () => {
  const colorScheme = useColorScheme();

  return (
    /* You can also overwrite some values passed to initThemeProvider here, e.g. if you want to set initial theme based on systems default color scheme */
    <ThemeProvider initialTheme={colorScheme === 'dark' : 'red' : 'blue'}>
      <InnerComponent />
    </ThemeProvider>
  );
};
```

#### Create style for component

```tsx
// InnerComponent.tsx

import React from 'react';
import { View } from 'react-native';
import { createUseStyle } from './path/to/themes.ts';

// createUseStyle basically returns (fn) => useStyle(fn)
const useStyle = createUseStyle((t) => ({
  container: {
    backgroundColor: t.colors.primary,
  },
}));

export default InnerComponent = () => {
  const styles = useStyle();

  return (
    /* under bs are styles created by baseStylesCreator */
    <View style={styles.bs.page}>
      <View style={styles.container} />
    </View>
  );
};
```

Alternatively you can use `createStyle` with `useStyle` combination, but it just leads to more code.
In order to receive correct types, you need to use `useStyle` and `useStyleWithParams` returned by `initThemeProvider`.

```tsx
// InnerComponent.tsx

import React from 'react';
import { View } from 'react-native';
import { createStyle, useStyleThemed, useStyleThemedWithParams } from './path/to/themes.ts';

// create styleCreator, the passed 't' is current theme object
const styleCreator = createStyle((t) => ({
  container: {
    backgroundColor: t.colors.primary,
  },
}));

export default InnerComponent = () => {
  // pass the styleCreator
  const styles = useStyleThemed(styleCreator);
  // or const styles = useStyleThemedWithParams(styleCreator, params);

  return (
    /* under bs are styles created by baseStylesCreator */
    <View style={styles.bs.page}>
      <View style={styles.container} />
    </View>
  );
};
```

#### Change or access theme

```tsx
// SomeComponent.tsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  useThemeDispatch,
  useTheme,
} from './path/to/themes.ts';

export default SomeComponent = () => {
  // selectedTheme is the key of selected theme
  // themes is the whole themes object
  // t is current theme object
  const { selectedTheme, themes, t } = useTheme();
  // to change theme
  const { setTheme } = useThemeDispatch();

  // to access current theme object. which is the same as `t` (t is the themeObj)
  const themeObj = themes[selectedTheme];

  return (
    <View>
      <Text>{`current theme is ${selectedTheme}`}</Text>
        <TouchableOpacity
          onPress={() => {
            const nextTheme = selectedTheme === 'red' ? 'blue' : 'red';
            setTheme(nextTheme);
          }}
        >
          <Text>Change theme</Text>
        </TouchableOpacity>
    </View>
  );
};
```

### Usage without initThemeProvider

You can theme each function individually like this, but you'll loose typing of the ThemeProvider

```ts
// themes.js
import {
  initThemeProvider
  createThemedStyleCreator,
  createThemedUseStyleCreator,
  createThemedUseTheme,
  createThemedUseThemeDispatch,
  useStyle,
  createThemedDefaultCacheManager,
  DefaultCacheManager,
  createThemedUseStyle,
  createThemedUseStyleWithParams,
} from '@pavelgric/react-native-theme-provider';

const blueTheme = {
  colors: {
    primary: 'blue'
  }
}

const redTheme = {
  colors: {
    primary: 'red'
  }
}

// you can have as many themes as you want and their names are up to you
export const themes = {
  blue: blueTheme,
  red: redTheme,
};

export type Themes = typeof themes;
export { useStyle };

/* create globally available styles, see further how these can be accessed */
export const baseStylesCreator = createThemedBaseStylesCreator<Themes>()((t) => ({
  page: {
    flex: 1,
    backgroundColor: t.colors.surface,
  },
  flex: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
type BaseStylesCreator = ReturnType<typeof baseStylesCreator>

// caching of style creators
const cacheManager = createThemedDefaultCacheManager<Themes>(); // or create your own cacheManager

export const createStyle = createThemedStyleCreator<Themes>(cacheManager); 
// alternatively export const createStyle = createThemedStyleCreator<Themes>(DefaultCacheManager)
export const createUseStyle = createThemedUseStyleCreator<Themes, BaseStylesCreator>(cacheManager);
// alternatively export const createStyle = createThemedStyleCreator<Themes>(DefaultCacheManager)
export const useTheme = createThemedUseTheme<Themes>();
export const useThemeDispatch = createThemedUseThemeDispatch<Themes>();

// If you want to be able to use `const styles = useStyle(styleCreator, params)`, you currently need to export and use these to work with typescript correctly.
// use for `const styles = useStyle(styleCreator)`
export const useStyle = createThemedUseStyle<Themes, BaseStylesCreator>();
// use for `const styles = useStyleWithParams(styleCreator, params)`
export const useStyleWithParams = createThemedUseStyleWithParams<Themes, BaseStylesCreator>();
```

#### Wrap your app with ThemeProvider

```js
import { ThemedProvider } from '@pavelgric/react-native-theme-provider';
import { useColorScheme } from 'react-native';

export default App = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider themes={themes} initialTheme={colorScheme === 'dark' : 'red' : 'blue'}>
      <InnerComponent />
    </ThemeProvider>
  );
};
```

Otherwise the usage is the same as with using the `initThemeProvider`

### Usage without any helpers

You import functions directly from `@pavelgric/react-native-theme-provider` (`createStyle`, `useStyle`, `createUseStyle` and others). There is no style default caching using library this way. Otherwise the usage of functions is same as above.

## Passing params to style creator

You can pass params to `useStyle` and similar functions, which will be accessible in `createStyle` and similar.

When using typescript, you will be alerted if you specify params in `createStyle` or `createUseStyle`, but do not pass them into `useStyle`.

> :warning: **Be aware that if you pass params this way, the the style creator is not cached and re-runs for every single component**. But you can create and pass your own cache manager to handle this case, see here for more information [Caching](#caching)

### Passing params examples

using `createStyle` and `useStyle` combination

```js
// InnerComponent.js

import React from 'react';
import { View } from 'react-native';
import { createStyle, useStyle } from '@pavelgric/react-native-theme-provider';

const styleCreator = createStyle(
  (t, { borderColor }: { borderColor: string }) => ({
    container: {
      backgroundColor: t.colors.primary,
      borderColor,
    },
  }),
);

export default InnerComponent = () => {
  const styles = useStyle(styleCreator, { borderColor: 'blue' });

  return <View style={styles.container} />;
};
```

using `createUseStyle`

```js
// InnerComponent.js

import React from 'react';
import { View } from 'react-native';
import { createUseStyle } from '@pavelgric/react-native-theme-provider';

const useStyle = createUseStyle(
  (t, { borderColor }: { borderColor: string }) => ({
    container: {
      backgroundColor: t.colors.primary,
      borderColor,
    },
  }),
);

export default InnerComponent = () => {
  const styles = useStyle({ borderColor: 'blue' });

  return <View style={styles.container} />;
};
```

## Passing and accessing default styles

You can create and access some basic styles like `{ flex: 1 }`, so you don't have to recreate them everywhere over and over again.
These styles will be passed to you by the `const styles = useStyle()` function and will be under `styles.bs` key. The `bs` key is reserved and you can't overwrite it in your style creator, meaning you can't have there some `bs: { flex: 1}`. 
This applies only if you pass the `baseStylesCreator` to the `initThemeProvider` or `ThemeProvider`, it's not required.
The `bs` object is singleton and is the same in all `styles` objects from `useStyle`.

First create base styles

```ts
import { createThemedBaseStylesCreator } from '@pavelgric/react-native-theme-provider';

export const themes = {
  // ...some themes
}

export const baseStylesCreator = createThemedBaseStylesCreator<typeof themes>()((t) => ({
  page: {
    flex: 1,
    backgroundColor: t.colors.surface,
  },
  flex: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
```

Pass them either to `initThemeProvider` or `ThemeProvider` directly

```tsx
export const {
  createUseStyle,
  createStyle,
  useTheme,
  useThemeDispatch,
  ThemeProvider,
} = initThemeProvider({ themes, initialTheme: 'red', baseStylesCreator });

// OR

export default App = () => {
  const colorScheme = useColorScheme();

  return (
    /* You can also overwrite some values passed to initThemeProvider here, e.g. if you want to set initial theme based on systems default color scheme */
    <ThemeProvider baseStylesCreator initialTheme={colorScheme === 'dark' : 'red' : 'blue'}>
      <InnerComponent />
    </ThemeProvider>
  );
};
```

Access them in your component

```tsx
// InnerComponent.tsx

import React from 'react';
import { View } from 'react-native';
import { createUseStyle } from './path/to/themes.ts';

// createUseStyle basically returns (fn) => useStyle(fn)
const useStyle = createUseStyle((t) => ({
  container: {
    backgroundColor: t.colors.primary,
  },
}));

export default InnerComponent = () => {
  const styles = useStyle();

  return (
    /* under bs key are styles created by baseStylesCreator */
    <View style={styles.bs.page}>
      <View style={styles.container} />
    </View>
  );
};
```

## Exported functions

### `initThemeProvider`

Helper function to generate all needed functions and type them with Typescript

Styles creators created by this function are cached, see [Caching](#caching).

```js
import {
  initThemeProvider,
  DefaultCacheManager
} from '@pavelgric/react-native-theme-provider';

const blueTheme = {
  colors: {
    primary: 'blue'
  }
}

const redTheme = {
  colors: {
    primary: 'red'
  }
}

// you can have as many themes as you want
export const themes = {
  blue: blueTheme,
  red: redTheme,
};

export const {
  createUseStyle,
  createStyle,
  useTheme,
  useThemeDispatch,
  ThemeProvider,
} = initThemeProvider({
  themes,
  initialTheme: 'light',
  onThemeChange: (nextThemeName) => {}
  styleCreatorCache: DefaultCacheManager
});
```

| Param | Type |  Required | description |
| ---- | --- | --- | ---|
| themes | Object | Yes | Themes object containing app themes |
| initialTheme | String | Yes | Name of one of the theme |
| onThemeChange | Function | No | Called when theme changes |
| styleCacheManager | Object | No | Object with functions to handle style caching. By default uses DefaultCacheManager |

### `createStyle`

This function is to create style object, similar to `StyleSheet.create`, except you receive the theme object and optional params. The function returns styleCreator, which is to be passed to `useStyle`.

```js
import { createStyle } from '@pavelgric/react-native-theme-provider';

const styleCreator = createStyle((t, passedParams) => ({
  container: {
    backgroundColor: t.colors.primary,
    opacity: passedParams.disabled ? 0.5 : 1,
  },
}));
```

### `useStyle`

This function accepts styleCreator created with `createStyle`, and returns style object returned by styleCreator.

You can also pass second argument, which can be then accessed in styleCreator.

> :warning: **Be aware that if you pass params this way, the the style creator is not cached and re-runs for every single component**. But you can create and pass your own cache manager to handle this case, see here for more information [Caching](#caching)

```js
import { useMemo } from 'react';
import { useStyle } from '@pavelgric/react-native-theme-provider';

import styleCreator from './styles';

export default FooComponent = ({ disabled }) => {
  // memoize params, to prevent unnecessary renders
  const styleParams = useMemo(() => ({ disabled }), [disabled]);
  const styles = useStyle(styleCreator, styleParams);

  return <YourComponents style={styles.container} />;
};
```

### `createUseStyle`

This combines `createStyle` and `useStyle` into one function and returns `useStyle` function for direct use.

```js
import { createUseStyle } from '@pavelgric/react-native-theme-provider';

const useStyle = createUseStyle((t, passedParams) => ({
  container: {
    backgroundColor: t.colors.primary,
    opacity: passedParams.disabled ? 0.5 : 1,
  },
}));

export default FooComponent = ({ disabled }) => {
  // memoize params, to prevent unnecessary renders
  const styleParams = useMemo(() => ({ disabled }), [disabled]);
  const styles = useStyle(styleParams);

  return <YourComponents style={styles.container} />;
};
```

### `useTheme`

Access theme in any Component.

```js
import { useTheme } from '@pavelgric/react-native-theme-provider';

export default SomeComponent = () => {
  const {
    selectedTheme, // the key of selected theme
    themes, // the whole themes object
    t, // current theme object
  } = useTheme();
  const { setTheme } = useThemeDispatch();

  // to access current theme object, or use t
  const themeObj = themes[selectedTheme];

  return <Component />;
};
```

### `useThemeDispatch`

Change theme

```js
import { useThemeDispatch } from '@pavelgric/react-native-theme-provider';

export default SomeComponent = () => {
  const { setTheme } = useThemeDispatch();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setTheme('blue');
        }}
      >
        <Text>Set blue theme</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setTheme('red');
        }}
      >
        <Text>Set red theme</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### `createThemedStyleCreator`

see [Usage without initThemeProvider](#usage-without-initthemeprovider)

### `createThemedUseStyleCreator`

see [Usage without initThemeProvider](#usage-without-initthemeprovider)

### `createThemedUseTheme`

see [Usage without initThemeProvider](#usage-without-initthemeprovider)

### `createThemedUseThemeDispatch`

see [Usage without initThemeProvider](#usage-without-initthemeprovider)

### `createThemedUseStyle`

see [Usage without initThemeProvider](#usage-without-initthemeprovider)

### `createThemedUseStyleWithParams`

see [Usage without initThemeProvider](#usage-without-initthemeprovider)

## Helper functions

### `createStylesWithProps`

This method allows you to create styles similarly to `StyleSheet.create`, but allows you to pass props.
This method is used to create base styles in example project.

```js
import { createStylesWithProps } from '@pavelgric/react-native-theme-provider';

type Colors = {
  primary: string,
  secondary: string,
};

// first create the style creator
const createStyles = createStylesWithProps((colors: Colors) => ({
  page: {
    backgroundColor: colors.surface,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

// now we can use this function and pass props
const lightStyles = createStyles({ primary: 'blue', secondary: 'light-blue' });
const darkStyles = createStyles({ primary: 'dark-blue', secondary: 'blue' });
```

## Wrappers

### `withUseStyle(Component, useStyleFunc, [mapPropsToParams])`

Passes styles as prop to class component created from `useStyle`.

```js
import { useStyle, withUseStyle } from '@pavelgric/react-native-theme-provider';

const useStyle = createUseStyle((t, passedParams) => ({
  container: {
    backgroundColor: t.colors.primary,
    opacity: passedParams.disabled ? 0.5 : 1,
  },
}));

type ClassCompProps = {
  styles: ReturnType<typeof useStyle>,
  disabled: boolean,
};

export class ClassComp extends Component<ClassCompProps> {
  render() {
    const { styles } = this.props;
    return <View style={styles.container} />;
  }
}

const ClassCompWithStyle = withUseStyle(
  ClassComp,
  useStyle,
  ({ disabled }) => ({ disabled }),
);
```

### `withCreateStyle(Component, createStyleFunc, [mapPropsToParams])`

Passes styles as prop to class component created from createStyle using `styleCreator`.

```js
import {
  styleCreator,
  withCreateStyle,
} from '@pavelgric/react-native-theme-provider';

const styleCreator = createStyle((t, passedParams) => ({
  container: {
    backgroundColor: t.colors.primary,
    opacity: passedParams.disabled ? 0.5 : 1,
  },
}));

type ClassCompProps = {
  styles: ReturnType<typeof styleCreator>,
  disabled: boolean,
};

export class ClassComp extends Component<ClassCompProps> {
  render() {
    const { styles } = this.props;
    return <View style={styles.container} />;
  }
}

const ClassCompWithStyle = withCreateStyle(
  ClassComp,
  styleCreator,
  ({ disabled }) => ({ disabled }),
);

const ClassCompWithStyleMemoized = withCreateStyle(
  ClassComp,
  styleCreator,
  undefined,
);
```

## Caching

imagine Image you have `ThemedText` component used all over the place, without caching, each `useStyle` would create new style object, but we can cache the style object, so it is created only once and then just reused. 

### Default Cache manager

By using the [`initThemeProvider`](#initthemeprovider) style creators are cached. To take advantage of the cache, you currently can't pass params to `useStyle` function. If you pass params, then the style creator is re-run every time for each component. 

### Providing your own cache manager

You can pass your own cache manager to [`initThemeProvider`](#initthemeprovider) function by passing `styleCacheManager` param. The styleCacheManager is an object with following props:

#### **onProviderMount**

Optional. Called when mounting the ThemeProvider component

#### **onThemeChange**

Required. Called when changing the theme in app. You should do something so the style creators re-run or correct cached values are used.

#### **onCacheStyleCreator**

Required. This is the function run for every style creator - function inside createStyle or createUseStyle. It receives the style creator and you can cache the resulting style or return already cached style.

#### onCacheStyleCreator

## Recommendations

Use creator function to ensure all theme objects have same shape, otherwise keys that are not present in all theme objects will be excluded by Typescript.

```js
// color pallete
const pallete = {
  red: 'red',
  blue: 'blue',
};

type Color = 'primary';

type Props = {
  colors: Record<Color, string>,
};

export const createTheme = (props: Props) => ({
  colors: props.colors,
});

const redThemeColors = {
  primary: pallete.red,
};

const blueThemeColors = {
  primary: pallete.blue,
};

export const redTheme = createTheme({ colors: redThemeColors });
export const blueTheme = createTheme({ colors: blueThemeColors });
export const themes = {
  redTheme,
  blueTheme,
};
```

It would be nice to have function that would warn about missing keys, but I didn't find way how to do that. Ideally something like:

```js
const blueTheme = {
  colors: {
    primary: 'blue',
    secondary: 'yellow',
  },
};

const redTheme = {
  colors: {
    primary: 'red',
  },
};

export const themes = createThemes({
  blueTheme,
  redTheme, // warn red theme is missing key 'secondary'
});
```

## Example

See example for semi-complete solution

to run example, you need to install dependencies both on package and example level, so navigate to this package in terminal and run

`yarn && cd example && yarn && cd ios && pod install`;

To modify the lib code and see changes immediately, do following changes in `./package.json`

```js
  "main": "src/index.ts", // <-- change to this
  "types": "src/index.ts", // <-- change to this
```

## TODO:

- [ ] Allow to pass baseStyles to ThemeProvider and use them with `useStyle` hook.