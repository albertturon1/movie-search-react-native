import React, {createContext, useContext, useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import colors from './src/theme/colors';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from './src/screens/Search';
import Movie from './src/screens/Movie';
import Homepage from './src/screens/Homepage';
import {Pressable, Text} from 'react-native';
import SearchButton from './src/components/Homepage/SearchButton';
import {Provider} from 'react-redux';
import { store } from './store';

const Stack = createNativeStackNavigator();

const App = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.primaryWhite,
    },
  };

  const HomepageProps = {options: {title: 'MovieDB', headerRight: () => <SearchButton />}};

  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={{}}>
            <Stack.Screen name="Homepage" component={Homepage} {...HomepageProps} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Movie" component={Movie} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
