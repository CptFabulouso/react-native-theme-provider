import { ThemeProvider } from '@pavelgric/react-native-theme-provider';
import React from 'react';

import HomeScreen from './screens/Home/HomeScreen';
import { themes } from '@themes';

const App = () => {
  return (
    <ThemeProvider themes={themes} initialTheme="light">
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
