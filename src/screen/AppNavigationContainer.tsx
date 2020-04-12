import React from 'react';
import {
  NavigationContainer,
  RouteProp,
  TabNavigationState,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainTabParamList, MainStackParamList } from '../type/Navigation';
import SystemInfo from './SystemInfo';
import DesignList from './DesignList';
import { useDarkMode } from 'react-native-dark-mode';
import { themeForNav } from '../design';
import RNDeviceInfoList from './RNDeviceInfo';

const MainTab = createBottomTabNavigator<MainTabParamList>();

function getTabHeader(
  route: RouteProp<MainStackParamList, 'MainTab'> & {
    state?: TabNavigationState;
  }
) {
  const { state } = route;
  if (!state) return 'SystemInfo';
  const { routeNames, index } = state;
  const routeName = routeNames[index] as keyof MainTabParamList;
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
              default:
                break;
            }
          },
        };
      }}
    >
      <MainTab.Screen name="SystemInfo" component={SystemInfo} />
      <MainTab.Screen name="DesignList" component={DesignList} />
    </MainTab.Navigator>
  );
};

const MainStack = createStackNavigator<MainStackParamList>();

export default () => {
  const inDarkMode = useDarkMode();
  return (
    <NavigationContainer
      theme={inDarkMode ? themeForNav.dark : themeForNav.light}
    >
      <MainStack.Navigator
        screenOptions={{
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
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
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
