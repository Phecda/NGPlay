import React, { useRef, useEffect, useReducer } from 'react';
import { useImmerReducer } from '@huse/immer';
import RNCWebview from 'react-native-webview';
import { reducer, defaultState, webActions, WebviewActions } from './reducer';
import { BGView } from '../../component/View';
import Header from './Header';
import Body from './Body';
import { MainStackScreenProps } from '../../type/Navigation';
import Toolbar from './Toolbar';
import ProgressBar from './ProgressBar';

const WebviewScreen = ({
  navigation,
  route,
}: MainStackScreenProps<'WebviewScreen'>) => {
  const paramUri = route.params?.uri ?? 'https://about:blank';
  const [state, dispatch] = useImmerReducer(reducer, {
    ...defaultState,
    url: paramUri,
  });

  const webview = useRef<RNCWebview>(null);

  return (
    <BGView>
      <Body
        initialUrl={paramUri}
        state={state}
        dispatch={dispatch}
        ref={webview}
      />
      <ProgressBar progress={state.progress} loading={state.loading} />
      <Toolbar state={state} dispatch={dispatch} webview={webview} />
    </BGView>
  );
};

export default WebviewScreen;
