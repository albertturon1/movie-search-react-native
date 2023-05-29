import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from '@interfaces/INavigation';
import {MovieScreen} from '@src/features/movie/MovieScreen';
import {TvScreen} from '@src/features/tv/TvScreen';

import {AppBottomTabNavigator} from './AppBottomTabNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => (
  <RootStack.Navigator
    initialRouteName="AppBottomTab"
    screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
    <RootStack.Screen name="AppBottomTab" component={AppBottomTabNavigator} />
    <RootStack.Screen name="Movie" component={MovieScreen} />
    <RootStack.Screen name="Tv" component={TvScreen} />
  </RootStack.Navigator>
);
