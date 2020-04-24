import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type MainTabParamList = {
  Library: undefined;
  SystemInfo: undefined;
  DesignList: undefined;
};

export type MainStackParamList = {
  MainTab: undefined;
  RNDeviceInfoList: undefined;
  WebviewScreen: { uri: string } | undefined;
  RNLocalize: undefined;
  RNCamera: undefined;
  RNCode: undefined;
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
