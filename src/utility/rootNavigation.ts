import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { MainStackParamList, MainTabParamList } from '../type/Navigation';

export const navigationRef = React.createRef<NavigationContainerRef>();
export const isMountedRef = React.createRef<
  boolean
>() as React.MutableRefObject<boolean>;

export function useMountedRef() {
  isMountedRef.current = true;
  return () => {
    isMountedRef.current = false;
  };
}

export type ParamList = MainStackParamList & MainTabParamList;
export type AllRouteNames = keyof ParamList;

export function rootNavigate<K extends AllRouteNames>(
  name: K,
  params: ParamList[K]
) {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}
