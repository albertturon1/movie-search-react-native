import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeStackParamList} from '@interfaces/INavigation';
import {HomeScreen} from '@src/features/home/HomeScreen';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home">
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
