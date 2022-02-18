import React from 'react';

import HomeScreen from './screens/Home/HomeScreen';
import { ThemeProvider, themes } from '@themes';

const App = () => {
  return (
    <ThemeProvider
      themes={themes}
      initialTheme="light"
      defaultStylesCreator={() => {}}
    >
      <HomeScreen />
    </ThemeProvider>
  );
};

export default App;
