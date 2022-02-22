import React from 'react';

import HomeScreen from './screens/Home/HomeScreen';
import { ThemeProvider } from '@themes';

const App = () => {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
