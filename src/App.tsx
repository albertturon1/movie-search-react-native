import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import SearchButton from '@components/Homepage/SearchButton';
import {RootStackParamList} from '@interfaces/INavigation';
import {store} from '@redux/store';
import Home from '@screens/Home/Home';
import Search from '@screens/Search';
import Theme from '@src/Theme';

import {MovieScreen} from './features/movie/MovieScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <GestureHandlerRootView style={Theme.styles.flexOne}>
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
                component={MovieScreen}
                options={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              />
            </Stack.Navigator>
          </SafeAreaProvider>
          <StatusBar
            backgroundColor={Theme.colors.background}
            barStyle="dark-content"
          />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  </GestureHandlerRootView>
);

export default App;
