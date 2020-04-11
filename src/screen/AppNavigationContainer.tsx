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
import { useDynamicValue } from 'react-native-dark-mode';
import { colorPreset } from '../design';
import RNDeviceInfoList from './RNDeviceInfo';
import { StyleSheet } from 'react-native';

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
  const backgroundColor = useDynamicValue(colorPreset.backgroundColor.primary);
  const tintColor = useDynamicValue(colorPreset.linkColor);
  const opaqueSeparator = useDynamicValue(colorPreset.separator.opaque);
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
      tabBarOptions={{
        activeTintColor: tintColor,
        style: {
          backgroundColor: backgroundColor,
          borderTopColor: opaqueSeparator,
        },
      }}
    >
      <MainTab.Screen name="SystemInfo" component={SystemInfo} />
      <MainTab.Screen name="DesignList" component={DesignList} />
    </MainTab.Navigator>
  );
};

const MainStack = createStackNavigator<MainStackParamList>();

export default () => {
  const backgroundColor = useDynamicValue(colorPreset.backgroundColor.primary);
  const primaryLabelColor = useDynamicValue(colorPreset.labelColor.primary);
  const opaqueSeparator = useDynamicValue(colorPreset.separator.opaque);
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor,
            shadowOffset: { width: 0, height: 0 },
            borderBottomColor: opaqueSeparator,
            borderBottomWidth: StyleSheet.hairlineWidth,
          },
          headerTintColor: primaryLabelColor,
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
