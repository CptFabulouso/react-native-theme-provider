import React from 'react';
import { useColorScheme, Dimensions } from 'react-native';

import HomeScreen from './screens/Home/HomeScreen';
import { ThemeProvider } from '@themes';

const initialThemeParams = {
  fontSizeMultiplier: Dimensions.get('window').width > 500 ? 1.3 : 1,
};
const App = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      initialTheme={colorScheme ?? 'light'}
      initialThemeParams={initialThemeParams}
    >
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
