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

to run example, you need to install dependencies on package level, so navigate to this package in terminal and run

`yarn && cd example && yarn && cd ios && pod install`;
