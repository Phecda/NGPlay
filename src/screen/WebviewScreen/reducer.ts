import React, { Reducer } from 'react';
import { WebViewNavigation } from 'react-native-webview';
import { Reducer as ImmerReducer } from 'use-immer';
import {
  WebViewError,
  WebViewProgressEvent,
  WebViewNativeProgressEvent,
  WebViewNativeEvent,
} from 'react-native-webview/lib/WebViewTypes';

export type WebviewActionTypes =
  | 'ChangeNavigationState'
  | 'OnLoadError'
  | 'OnLoadProgress'
  | 'LoadText';

type PayloadAction<Type extends WebviewActionTypes, Payload> = {
  type: Type;
  payload: Payload;
};

export type WebviewActions =
  | PayloadAction<'ChangeNavigationState', WebViewNavigation>
  | PayloadAction<'LoadText', string>
  | PayloadAction<'OnLoadError', WebViewError>
  | PayloadAction<'OnLoadProgress', WebViewNativeProgressEvent>;

type PayloadOf<
  A extends { type: string; payload: any },
  T extends string
> = A extends {
  type: T;
  payload: infer R;
}
  ? R
  : never;

const createAction = <
  T extends WebviewActionTypes,
  P extends PayloadOf<WebviewActions, T>
>(
  type: T
) => (payload: P) => ({
  type,
  payload,
});

export const webActions = {
  changeNavigationState: createAction('ChangeNavigationState'),
  onLoadError: createAction('OnLoadError'),
  onLoadProgress: createAction('OnLoadProgress'),
  loadText: createAction('LoadText'),
};

export type WebviewState = WebViewNativeEvent & {
  domain?: string;
  code?: number;
  description?: string;
  progress: number;
};

export const defaultState: WebviewState = {
  canGoBack: false,
  canGoForward: false,
  url: 'https://about:blank',
  title: '',
  lockIdentifier: 0,
  loading: false,
  progress: 0,
};

export const reducer: ImmerReducer<WebviewState, WebviewActions> = (
  state,
  action
) => {
  switch (action.type) {
    case 'ChangeNavigationState':
    case 'OnLoadProgress':
    case 'OnLoadError':
      return { ...state, ...action.payload };
    case 'LoadText':
      state.url = action.payload;
      break;
  }
};
