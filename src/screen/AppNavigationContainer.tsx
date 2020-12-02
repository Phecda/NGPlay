import React from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  MainTabParamList,
  MainStackParamList,
  AuthStackParamList,
} from '../type/Navigation';
import SystemInfo from './SystemInfo';
import DesignList from './DesignList';
import { useDarkMode } from 'react-native-dark-mode';
import { themeForNav } from '../design';
import RNDeviceInfoList from './RNDeviceInfo';
import WebviewScreen from './WebviewScreen';
import { Platform } from 'react-native';
import RNLocalize from './RNLocalize';
import { useI18nStrings } from '../i18n';
import CameraScreen from './CameraScreen';
import Library from './Library';
import ReadableCode from './ReadableCode';
import { useDeepLinking } from '../utility/handleDeepLinking';
import { navigationRef, useMountedRef } from '../utility/rootNavigation';
import ShortcutPage from './ShortcutItem';
import useQuickAction from '../utility/useQuickAction';
import { useReduxState } from '../store/hooks';
import LoginScreen from './Login';
import MeScreen from './Me';
import RNDialogs from './Dialogs';

const MainTab = createBottomTabNavigator<MainTabParamList>();

function getTabHeader(route: RouteProp<MainStackParamList, 'MainTab'>) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Library';
  return routeName;
}

const Home = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => {
        const routeName = route.name;
        return {
          tabBarIcon: ({ focused, size, color }) => {
            switch (routeName) {
              case 'SystemInfo':
                return (
                  <Ionicons
                    size={size}
                    color={color}
                    name={
                      focused
                        ? 'ios-information-circle'
                        : 'ios-information-circle-outline'
                    }
                  />
                );
              case 'DesignList':
                return (
                  <Ionicons
                    size={size}
                    color={color}
                    name={'ios-color-palette'}
                  />
                );
              case 'Library':
                return (
                  <Ionicons
                    size={size}
                    color={color}
                    name={focused ? 'ios-list-circle' : 'ios-list'}
                  />
                );
              case 'Me':
                return (
                  <Ionicons size={size} color={color} name={'ios-person'} />
                );
              default:
                break;
            }
          },
        };
      }}
    >
      <MainTab.Screen name="Library" component={Library} />
      <MainTab.Screen name="SystemInfo" component={SystemInfo} />
      <MainTab.Screen name="DesignList" component={DesignList} />
      <MainTab.Screen name="Me" component={MeScreen} />
    </MainTab.Navigator>
  );
};

const MainStack = createStackNavigator<MainStackParamList>();

const AuthStack = createStackNavigator<AuthStackParamList>();

const Container = () => {
  const inDarkMode = useDarkMode();
  const strings = useI18nStrings();
  const user = useReduxState('user');

  useMountedRef();
  useDeepLinking();
  useQuickAction();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={inDarkMode ? themeForNav.dark : themeForNav.light}
    >
      {user.token ? (
        <MainStack.Navigator
          screenOptions={{
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            headerTruncatedBackTitle: strings.navigation.back,
          }}
        >
          <MainStack.Screen
            name="MainTab"
            component={Home}
            options={({ route }) => {
              return { headerTitle: getTabHeader(route) };
            }}
          />
          <MainStack.Screen
            name="RNDeviceInfoList"
            component={RNDeviceInfoList}
          />
          <MainStack.Screen
            name="WebviewScreen"
            component={WebviewScreen}
            options={({ navigation, route }) => ({
              // FIXME: https://github.com/react-native-community/react-native-webview/issues/575#issuecomment-587267906
              animationEnabled: Platform.OS === 'ios',
            })}
          />
          <MainStack.Screen name="RNLocalize" component={RNLocalize} />
          <MainStack.Screen name="RNCamera" component={CameraScreen} />
          <MainStack.Screen name="RNCode" component={ReadableCode} />
          <MainStack.Screen name="ShortcutItem" component={ShortcutPage} />
          <MainStack.Screen name="RNDialogs" component={RNDialogs} />
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Container;
