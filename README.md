# React Native Theme Provider

- [React Native Theme Provider](#react-native-theme-provider)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Typescript usage](#typescript-usage)
  - [Recommendations](#recommendations)
  - [Example](#example)

## Installation

`yarn add @pavelgric/react-native-theme-provider`

## Usage

Create themes

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

Wrap app with ThemeProvider with created themes

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

Access theme from any component

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

Lastly to change or access theme

```js
// SomeComponent.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useThemeDispatch, useTheme } from '@pavelgric/react-native-theme-provider';

export default SomeComponent = () => {
  // selectedTheme is the key of selected theme
  // themes is the whole themes object
  const { selectedTheme, themes } = useTheme();
  // to change theme
  const { setTheme } = useThemeDispatch();

  // to access current theme object
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

## Typescript usage

The library provides few functions to help passing down the Theme type

Define your themes and use creator functions

```js
// themes.js
import {
  createStyleCreator,
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
export const createStyle = createStyleCreator<Themes>();
export const useTheme = createUseTheme<Themes>();
export const useThemeDispatch = createUseThemeDispatch<Themes>();
```

now instead of importing the functions directly from this package

```js
import { createStyle, useTheme, useThemeDispatch, useStyle } from '@pavelgric/react-native-theme-provider';
```

you import them from the `themes.js` file

```js
import { createStyle, useTheme, useThemeDispatch, useStyle } from './path/to/themes.js';
```

now these functions are typed

```js
import { createStyle } from './path/to/themes.js';
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
