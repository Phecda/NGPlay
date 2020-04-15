import React, { useCallback } from 'react';
import RNCWebView, { WebViewNavigation } from 'react-native-webview';
import { WebviewState, WebviewActions, webActions } from './reducer';
import {
  WebViewProgressEvent,
  WebViewErrorEvent,
  OnShouldStartLoadWithRequest,
} from 'react-native-webview/lib/WebViewTypes';
import ErrorView from './ErrorView';
import { Linking } from 'react-native';

const Body = React.forwardRef<
  RNCWebView,
  {
    state: WebviewState;
    dispatch: React.Dispatch<WebviewActions>;
    initialUrl: string;
  }
>(({ state, dispatch, initialUrl }, ref) => {
  const onNavigationStateChange = useCallback(
    (s: WebViewNavigation) => {
      dispatch(webActions.changeNavigationState(s));
    },
    [dispatch]
  );

  const onLoadProgress = useCallback(
    (s: WebViewProgressEvent) => {
      dispatch(webActions.onLoadProgress(s.nativeEvent));
    },
    [dispatch]
  );

  const onError = useCallback(
    (s: WebViewErrorEvent) => {
      dispatch(webActions.onLoadError(s.nativeEvent));
    },
    [dispatch]
  );

  const shouldRequest: OnShouldStartLoadWithRequest = useCallback(
    (request) => {
      const { url } = request;
      if (url.startsWith('http') || url === 'about:blank') {
        return true;
      } else {
        dispatch(webActions.changeNavigationState(request));
        Linking.canOpenURL(url)
          .then((canOpen) => {
            if (canOpen) {
              return Linking.openURL(url);
            }
          })
          .catch(() => {});
        return false;
      }
    },
    [dispatch]
  );

  return (
    <RNCWebView
      ref={ref}
      source={{ uri: initialUrl }}
      onNavigationStateChange={onNavigationStateChange}
      onLoadProgress={onLoadProgress}
      onError={onError}
      onShouldStartLoadWithRequest={shouldRequest}
      renderError={(_, code, description) => (
        <ErrorView code={code} description={description} />
      )}
    />
  );
});

export default Body;
