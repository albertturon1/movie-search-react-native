import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import SearchButton from '@components/Homepage/SearchButton';
import {RootStackParamList} from '@navigation/INavigation';
import {store} from '@redux/store';
import Home from '@screens/Home/Home';
import Movie from '@screens/Movie';
import Search from '@screens/Search';
import Theme from '@src/Theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <Provider store={store}>
    <NavigationContainer theme={Theme}>
      <PaperProvider>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Trending Movies',
                headerRight: () => <SearchButton />,
              }}
            />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen
              name="Movie"
              component={Movie}
              options={{
                headerTransparent: true,
                animation: 'slide_from_right',
                headerTintColor: Theme.colors.primaryWhite,
                title: '',
              }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </PaperProvider>
    </NavigationContainer>
  </Provider>
);

export default App;
