import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainTabParamList, MainStackParamList } from '../type/Navigation';
import WelcomePage from './WelcomePage';
import SystemInfo from './SystemInfo';
import DesignList from './DesignList';
import { useDynamicValue } from 'react-native-dark-mode';
import { colorPreset } from '../design';
import RNDeviceInfoList from './RNDeviceInfo';

const MainTab = createBottomTabNavigator<MainTabParamList>();

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
              case 'WelcomePage':
                return <Fontisto size={size} color={color} name={'react'} />;
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
      <MainTab.Screen name="WelcomePage" component={WelcomePage} />
      <MainTab.Screen name="SystemInfo" component={SystemInfo} />
      <MainTab.Screen name="DesignList" component={DesignList} />
    </MainTab.Navigator>
  );
};

const MainStack = createStackNavigator<MainStackParamList>();

export default () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="MainTab" component={Home} />
        <MainStack.Screen
          name="RNDeviceInfoList"
          component={RNDeviceInfoList}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};