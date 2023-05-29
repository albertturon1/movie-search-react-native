import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeStackParamList} from '@interfaces/INavigation';
import {HomeScreen} from '@src/features/home/screens/HomeScreen';
import {MoviesTrendingScreen} from '@src/features/home/screens/MoviesTrendingScreen';
import {TvTrendingScreen} from '@src/features/home/screens/TvTrendingScreen';
import {UpcomingMoviesScreen} from '@src/features/home/screens/UpcomingMoviesScreen';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      headerTitleAlign: 'center',
    }}
    initialRouteName="Home">
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen
      name="MoviesTrending"
      component={MoviesTrendingScreen}
      options={{
        headerShown: true,
        title: 'Trending movies',
      }}
    />
    <HomeStack.Screen
      name="TvTrending"
      component={TvTrendingScreen}
      options={{
        headerShown: true,
        title: 'Trending TV Series',
      }}
    />
    <HomeStack.Screen
      name="UpcomingMovies"
      component={UpcomingMoviesScreen}
      options={{
        headerShown: true,
        title: 'Upcoming movies',
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackNavigator;
