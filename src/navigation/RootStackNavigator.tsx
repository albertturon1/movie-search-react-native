import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from '@interfaces/INavigation';
import {MovieScreen} from '@src/features/movie/MovieScreen';

import {AppBottomTabNavigator} from './AppBottomTabNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => (
  <RootStack.Navigator
    initialRouteName="AppBottomTab"
    screenOptions={{headerShown: false}}>
    <RootStack.Screen name="AppBottomTab" component={AppBottomTabNavigator} />
    <RootStack.Screen name="Movie" component={MovieScreen} />
  </RootStack.Navigator>
);
