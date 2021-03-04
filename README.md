# React Native Theme Provider

- [React Native Theme Provider](#react-native-theme-provider)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Create themes](#create-themes)
    - [Wrap app with ThemeProvider with created themes](#wrap-app-with-themeprovider-with-created-themes)
    - [Access theme from any component](#access-theme-from-any-component)
    - [Lastly to change or access theme](#lastly-to-change-or-access-theme)
  - [Passing params to style creator](#passing-params-to-style-creator)
    - [Passing params examples](#passing-params-examples)
  - [Typescript usage](#typescript-usage)
  - [Exported functions](#exported-functions)
    - [`createStyle`](#createstyle)
    - [`useStyle`](#usestyle)
    - [`useCachedStyle`](#usecachedstyle)
    - [`createUseStyle`](#createusestyle)
    - [`useTheme`](#usetheme)
    - [`useThemeDispatch`](#usethemedispatch)
    - [`createThemedStyleCreator`](#createthemedstylecreator)
    - [`createUseTheme`](#createusetheme)
    - [`createUseThemeDispatch`](#createusethemedispatch)
  - [Wrappers](#wrappers)
    - [`withUseStyle(Component, useStyleFunc, [mapPropsToParams])`](#withusestylecomponent-usestylefunc-mappropstoparams)
    - [`withCreateStyle(Component, createStyleFunc, [mapPropsToParams, [memoizeKey]])`](#withcreatestylecomponent-createstylefunc-mappropstoparams-memoizekey)
  - [Recommendations](#recommendations)
  - [Example](#example)

## Installation

`yarn add @pavelgric/react-native-theme-provider`

## Usage

### Create themes

```js
// themes.js

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
```

### Wrap app with ThemeProvider with created themes

```js
// App.js

import React from 'react';
import { ThemeProvider } from '@pavelgric/react-native-theme-provider';
import { themes } from './themes';

export default App = () => {
  return(
    <ThemeProvider
      themes={themes}
      initialTheme="red"
    >
      <InnerComponent />
    </ThemeProvider>
  )
}
```

### Access theme from any component

```js
// InnerComponent.js

import React from 'react';
import { View } from 'react-native';
import { createStyle, useStyle } from '@pavelgric/react-native-theme-provider';

// create styleCreator, the passed 't' is current theme object
const styleCreator = createStyle((t) => ({
  container: {
    backgroundColor: t.colors.primary
  },
}));

export default InnerComponent = () => {
  // pass the styleCreator
  const styles = useStyle(styleCreator);

  return (
    <View style={styles.container} />
  )
}
```

Alternatively you can use `createUseStyle` helper function to remove few lines of code

```js
// InnerComponent.js

import React from 'react';
import { View } from 'react-native';
import { createUseStyle } from '@pavelgric/react-native-theme-provider';

// createUseStyle basically returns (fn) => useStyle(fn)
const useStyle = createUseStyle((t) => ({
  container: {
    backgroundColor: t.colors.primary
  },
}));

export default InnerComponent = () => {
  const styles = useStyle();

  return (
    <View style={styles.container} />
  )
}
```

### Lastly to change or access theme

```js
// SomeComponent.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeDispatch, useTheme } from '@pavelgric/react-native-theme-provider';

export default SomeComponent = () => {
  // selectedTheme is the key of selected theme
  // themes is the whole themes object
  // t is current theme object
  const { selectedTheme, themes, t } = useTheme();
  // to change theme
  const { setTheme } = useThemeDispatch();

  // to access current theme object, or use t
  const themeObj = themes[selectedTheme];

  return(
    <View>
      <Text>{`current theme is ${selectedTheme}`}</Text>
      <TouchableOpacity onPress={() => {
        const nextTheme = selectedTheme === 'red'? 'blue' : 'red'
        setTheme(nextTheme)
      }}>
        <Text>Change theme</Text>
      </TouchableOpacity>
    </View>
  )
}
```

## Passing params to style creator

You can pass params to `useStyle` and similar functions, which will be accessible in `createStyle` and similar.

When using typescript, you will be alerted if you specify params in `createStyle`, but do not pass it into `useStyle`

### Passing params examples

using `createStyle` and `useStyle` combination

```js
// InnerComponent.js

import React from 'react';
import { View } from 'react-native';
import { createStyle, useStyle } from '@pavelgric/react-native-theme-provider';

const styleCreator = createStyle((t, { borderColor }: {borderColor: string}) => ({
  container: {
    backgroundColor: t.colors.primary
  },
}));

export default InnerComponent = () => {
  const styles = useStyle(styleCreator, { borderColor: 'blue' });

  return (
    <View style={styles.container} />
  )
}
```

using `createUseStyle`

```js
// InnerComponent.js

import React from 'react';
import { View } from 'react-native';
import { createUseStyle } from '@pavelgric/react-native-theme-provider';

const useStyle = createUseStyle((t, { borderColor }: {borderColor: string}) => ({
  container: {
    backgroundColor: t.colors.primary,
    borderColor,
  },
}));

export default InnerComponent = () => {
  const styles = useStyle({ borderColor: 'blue' });

  return (
    <View style={styles.container} />
  )
}
```

using themed `createThemedUseStyleCreator`

```js
// InnerComponent.js

import React from 'react';
import { View } from 'react-native';
import { createThemedUseStyleCreator } from '@pavelgric/react-native-theme-provider';

type Themes = {
  light: {
    colors:{
      primary: 'blue'
    }
  }
}

const createUseStyle = createThemedUseStyleCreator<Themes>()

const useStyle = createUseStyle((t, { borderColor }: {borderColor: string}) => ({
  container: {
    backgroundColor: t.colors.primary,
    borderColor,
  },
}));

export default InnerComponent = () => {
  const styles = useStyle({ borderColor: 'blue' });

  return (
    <View style={styles.container} />
  )
}
```

## Typescript usage

The library provides few functions to help passing down the Theme type

Define your themes and use creator functions

```js
// themes.js
import {
  createThemedStyleCreator,
  createThemedUseStyleCreator,
  createUseTheme,
  createUseThemeDispatch,
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

// you can have as many themes as you want
export const themes = {
  blue: blueTheme,
  red: redTheme,
};

export type Themes = typeof themes;
// useStyle does not depend on Theme, this is just to make it also accessible from here
export { useStyle };
export const createStyle = createThemedStyleCreator<Themes>();
export const createUseStyle = createThemedUseStyleCreator<Themes>();
export const useTheme = createUseTheme<Themes>();
export const useThemeDispatch = createUseThemeDispatch<Themes>();
```

now instead of importing the functions directly from this package

```js
import { createStyle, createUseStyle, useTheme, useThemeDispatch, useStyle } from '@pavelgric/react-native-theme-provider';
```

you import them from the `themes.js` file

```js
import { createStyle, createUseStyle, useTheme, useThemeDispatch, useStyle } from './path/to/themes.js';
```

now these functions are typed

```js
import { createStyle, /* or createUseStyle */ } from './path/to/themes.js'; 
// t is now of type Theme
const styleCreator = createStyle((t) => ({
  container: {
    backgroundColor: t.colors.primary
  },
}));
```

## Exported functions

### `createStyle`

This function is to create style object, similar to `StyleSheet.create`, except you receive the theme object and optional params. The function returns styleCreator, which is to be passed to `useStyle`.

```js
import { createStyle } from '@pavelgric/react-native-theme-provider'; 

const styleCreator = createStyle((t, passedParams) => ({
  container: {
    backgroundColor: t.colors.primary,
    opacity: passedParams.disabled? 0.5 : 1,
  },
}));
```

### `useStyle`

This function accepts styleCreator created with `createStyle`, and returns style object returned by styleCreator.

You can also pass second argument, which can be then accessed in styleCreator.

The returned style is memoized and doesn't change (and compute) unless the theme is changed.
Note that if you pass params as object and don't want to calculate style on each render, you need to memoize it.

```js
import { useMemo } from 'react';
import { useStyle } from '@pavelgric/react-native-theme-provider';

import styleCreator from './styles'

export default FooComponent = ({disabled}) => {
  // memoize params, to prevent unnecessary renders
  const styleParams = useMemo(() => ({ disabled }), [disabled])
  const styles = useStyle(styleCreator, styleParams);

  return <YourComponents style={styles.container} />
}
```

### `useCachedStyle`

Similar to `useStyle`, but the object created in styleCreator is cached, so we don't create new instance for every component.

Image you have `ThemedText` component used all over the place, with `useStyle` each of the `ThemedText` component has its own style object.
With `useCachedStyle` only one style object is created and shared by all `ThemedText` components.
Beware that because all components share one style object this function doesn't currently allow passing params. That may be allowed in future

Technically this function just wraps `useStyle` and you can achieve the same by using `useStyle(styleCreator, undefined, 'UniqueKey')`,
the `useCachedStyle` just avoids that weird syntax. Still if you would try passing params instead of `undefined`, the cache won't be used, there is no bypassing.

```js
import { Text } from 'react-native';
import { useCachedStyle } from '@pavelgric/react-native-theme-provider';

import styleCreator from './styles'

export default ThemedText = ({disabled}) => {
  const styles = useCachedStyle(styleCreator, 'ThemedText');

  // useCachedStyle doesn't allow passing params, handle conditional styles in component
  return <Text style={[styles.container, { opacity: disabled? 0.5 : 1 }]} />
}
```

### `createUseStyle`

This combines `createStyle` and `useStyle` into one function and returns `useStyle` function for direct use.

If you don't pass params, style is automatically cached with `useCachedStyle`, otherwise `useStyle` is used.

```js
import { createUseStyle } from '@pavelgric/react-native-theme-provider'; 

const useStyle = createUseStyle((t, passedParams) => ({
  container: {
    backgroundColor: t.colors.primary,
    opacity: passedParams.disabled? 0.5 : 1,
  },
}));

export default FooComponent = ({disabled}) => {
  // memoize params, to prevent unnecessary renders
  const styleParams = useMemo(() => ({ disabled }), [disabled])
  const styles = useStyle(styleParams);

  return <YourComponents style={styles.container} />
}
```

### `useTheme`

Access theme in any Component.

```js
import { useTheme } from '@pavelgric/react-native-theme-provider';

export default SomeComponent = () => {
  const { 
    selectedTheme, // the key of selected theme
    themes, // the whole themes object
    t // current theme object
  } = useTheme();
  const { setTheme } = useThemeDispatch();

  // to access current theme object, or use t
  const themeObj = themes[selectedTheme];

  return <Component />
}
```

### `useThemeDispatch`

Change theme

```js
import { useThemeDispatch } from '@pavelgric/react-native-theme-provider';

export default SomeComponent = () => {
  const { setTheme } = useThemeDispatch();

  return(
    <View>
      <TouchableOpacity onPress={() => {setTheme('blue')}}>
        <Text>Set blue theme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setTheme('red')}}>
        <Text>Set red theme</Text>
      </TouchableOpacity>
    </View>
  )
}
```

### `createThemedStyleCreator`

see [Typescript usage](#typescript-usage). Returned function does style caching same way as `createUseStyle`

### `createUseTheme`

see [Typescript usage](#typescript-usage)

### `createUseThemeDispatch`

see [Typescript usage](#typescript-usage)

## Wrappers

### `withUseStyle(Component, useStyleFunc, [mapPropsToParams])`

Passes styles as prop to class component created from `useStyle`. Style object is memoized if you do not pass params.

```js
import { useStyle, withUseStyle } from '@pavelgric/react-native-theme-provider';

const useStyle = createUseStyle((t, passedParams) => ({
  container: {
    backgroundColor: t.colors.primary,
    opacity: passedParams.disabled? 0.5 : 1,
  },
}));

type ClassCompProps = {
  styles: ReturnType<typeof useStyle>;
  disabled: boolean;
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
  ({disabled}) => ({disabled})
);

```

### `withCreateStyle(Component, createStyleFunc, [mapPropsToParams, [memoizeKey]])`

Passes styles as prop to class component created from createStyle using `styleCreator`.
To memoize the resulting style object, you must pass undefined in `mapPropsToParams` and then some unique key.

```js
import { styleCreator, withCreateStyle } from '@pavelgric/react-native-theme-provider';

const styleCreator = createStyle((t, passedParams) => ({
  container: {
    backgroundColor: t.colors.primary,
    opacity: passedParams.disabled? 0.5 : 1,
  },
}));

type ClassCompProps = {
  styles: ReturnType<typeof styleCreator>;
  disabled: boolean;
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
  ({disabled}) => ({disabled})
);

const ClassCompWithStyleMemoized = withCreateStyle(
  ClassComp,
  styleCreator,
  undefined,
  'UniqueKey'
);

```

## Recommendations

Use creator function to ensure all theme objects have same shape, otherwise keys that are not present in all theme objects will be excluded by Typescript.

```js
// color pallete
const pallete = {
  red: 'red',
  blue: 'blue'
}

type Color =
  | 'primary'

type Props = {
  colors: Record<Color, string>;
};

export const createTheme = (props: Props) => ({
  colors: props.colors
})

const redThemeColors = {
  primary: pallete.red
};

const blueThemeColors = {
  primary: pallete.blue
};

export const redTheme = createTheme({colors: redThemeColors});
export const blueTheme = createTheme({colors: blueThemeColors});
export const themes = {
  redTheme,
  blueTheme
}
```

It would be nice to have function that would warn about missing keys, but I didn't find way how to do that. Ideally something like:

```js
const blueTheme = {
  colors: {
    primary: 'blue',
    secondary: 'yellow'
  }
}

const redTheme = {
  colors: {
    primary: 'red'
  }
}

export const themes = createThemes({
  blueTheme,
  redTheme, // warn red theme is missing key 'secondary'
})
```

## Example

See example for semi-complete solution

to run example, you need to install dependencies both on package and example level, so navigate to this package in terminal and run

`yarn && cd example && yarn && cd ios && pod install`;
