/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { DarkModeProvider } from 'react-native-dark-mode';
import { enableScreens } from 'react-native-screens';
import AppNavigationContainer from './src/screen/AppNavigationContainer';

if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}

enableScreens();

const App = () => {
  return (
    <DarkModeProvider>
      <AppNavigationContainer />
    </DarkModeProvider>
  );
};

export default App;
