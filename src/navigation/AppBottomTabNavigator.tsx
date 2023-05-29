import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {AppBottomTabParamList} from '@interfaces/INavigation';

import HomeStackNavigator from './HomeStackNavigator';
import {SearchStackNavigator} from './SearchStackNavigator';
const Tab = createBottomTabNavigator<AppBottomTabParamList>();

export const AppBottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeStackNavigator"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen
      name="HomeStackNavigator"
      component={HomeStackNavigator}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <FontAwesome name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="SearchStackNavigator"
      component={SearchStackNavigator}
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({color, size}) => (
          <FontAwesome name="search" color={color} size={size - 2} />
        ),
      }}
    />
  </Tab.Navigator>
);
