import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type MainTabParamList = {
  Library: undefined;
  SystemInfo: undefined;
  DesignList: undefined;
  Me: undefined;
};

export type MainStackParamList = {
  MainTab: { screen?: keyof MainTabParamList };
  RNDeviceInfoList: undefined;
  WebviewScreen: { uri: string } | undefined;
  RNLocalize: undefined;
  RNCamera: undefined;
  RNCode: undefined;
  ShortcutItem: { id?: string };
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MainTabScreenProps<RouteName extends keyof MainTabParamList> = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, RouteName>,
    StackNavigationProp<MainStackParamList>
  >;
  route: RouteProp<MainTabParamList, RouteName>;
};

export type MainStackScreenProps<RouteName extends keyof MainStackParamList> = {
  navigation: StackNavigationProp<MainStackParamList, RouteName>;
  route: RouteProp<MainStackParamList, RouteName>;
};

export type AuthStackScreenProps<RouteName extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, RouteName>;
  route: RouteProp<AuthStackParamList, RouteName>;
};
