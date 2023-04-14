import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '@screens/Search';
import Movie from '@screens/Movie';
import Home from '@screens/Home/Home';
import SearchButton from '@components/Homepage/SearchButton';
import {Provider} from 'react-redux';
import {store} from '@redux/store';
import {Provider as PaperProvider} from 'react-native-paper';
import {RootStackParamList} from '@navigation/INavigation';
import Theme from '@src/Theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC<RootStackParamList> = () => {
  return (
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
};

export default App;
