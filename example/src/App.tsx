import React from 'react';
import { useColorScheme } from 'react-native';

import HomeScreen from './screens/Home/HomeScreen';
import { ThemeProvider } from '@themes';

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider initialTheme={colorScheme ?? 'light'}>
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
