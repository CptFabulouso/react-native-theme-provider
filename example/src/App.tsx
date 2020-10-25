import { ThemeProvider } from '@pavelgric/react-native-theme-provider';
import React from 'react';

import { themes } from '@themes';
import HomeScreen from './screens/Home/HomeScreen';

const App = () => {
  return (
    <ThemeProvider themes={themes} initialTheme="light">
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
