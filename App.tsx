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
import { enableES5 } from 'immer';
import AppNavigationContainer from './src/screen/AppNavigationContainer';
import { I18NProvider } from './src/i18n';
import { Platform } from 'react-native';

declare var global: { HermesInternal: null | {} };
if (Platform.OS === 'android' && global.HermesInternal) {
  // https://immerjs.github.io/immer/docs/installation#immer-on-older-javascript-environments
  enableES5();
}

if (__DEV__) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}

enableScreens();

const App = () => {
  return (
    <I18NProvider>
      <DarkModeProvider>
        <AppNavigationContainer />
      </DarkModeProvider>
    </I18NProvider>
  );
};

export default App;
