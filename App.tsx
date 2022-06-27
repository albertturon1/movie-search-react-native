import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import colors from './src/theme/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/core';
import Search from './src/screens/Search';
import Movie from './src/screens/Movie';
import Homepage from './src/screens/Homepage';
import SearchButton from './src/components/Homepage/SearchButton';
import { Provider } from 'react-redux';
import { store } from './store';
import { Movie as MovieInterface } from './src/services/moviesApi';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Homepage: undefined;
  Search: undefined;
  Movie: {
    data: MovieInterface;
  };
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

export type NavigationProps<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

const App: React.FC<RootStackParamList> = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.primaryWhite,
    },
  };

  const HomepageProps = {
    options: {
      title: 'Trending Movies',
      headerRight: () => <SearchButton />,
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <PaperProvider>
          <SafeAreaProvider>
            <Stack.Navigator>
              <Stack.Screen name="Homepage" component={Homepage} {...HomepageProps} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen
                name="Movie"
                component={Movie}
                options={{ headerTransparent: true, animation: 'slide_from_right', headerTintColor: colors.primaryWhite, title: '' }}
              />
            </Stack.Navigator>
          </SafeAreaProvider>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
