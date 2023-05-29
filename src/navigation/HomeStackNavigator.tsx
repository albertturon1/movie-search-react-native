import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeStackParamList} from '@interfaces/INavigation';
import {HomeScreen} from '@src/features/home/screens/HomeScreen';
import {MoviesTrendingScreen} from '@src/features/home/screens/MoviesTrendingScreen';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Home">
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="MoviesTrending" component={MoviesTrendingScreen} />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
