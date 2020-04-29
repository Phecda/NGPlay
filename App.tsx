import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DarkModeProvider } from 'react-native-dark-mode';
import { enableScreens } from 'react-native-screens';
import { enableES5 } from 'immer';
import AppNavigationContainer from './src/screen/AppNavigationContainer';
import { I18NProvider } from './src/i18n';
import { Platform } from 'react-native';
import { store, persistor } from './src/store';

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
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <I18NProvider>
          <DarkModeProvider>
            <AppNavigationContainer />
          </DarkModeProvider>
        </I18NProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
