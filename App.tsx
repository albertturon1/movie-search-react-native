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
import {store} from './store';
import {ftype} from './src/theme/fonts';
import { configureFonts, DefaultTheme as DefaultThemePaper, Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const App = () => {
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
      headerTitleStyle: {
        fontFamily: ftype.medium,
      },
    },
  };

  const fontConfig = {
    android: {
      regular: {
        fontFamily: 'Roboto-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Roboto-Medium',
        fontWeight: 'normal',
      },
      bold: {
        fontFamily: 'Roboto-Bold',
        fontWeight: 'normal',
      },
    }
  };


  const theme = {
    ...DefaultThemePaper,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      primaryWhite: 'rgba(255,255,255,0.9)',
      secondaryWhite: 'rgba(255,255,255,0.8)',
      tertiaryWhite: 'rgba(255,255,255,0.7)',
      primaryBlack: '#000',
      secondaryBlack: '#161618',
      tertiaryBlack: '#212124',
    },
    fonts: configureFonts(fontConfig),
  };



  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <Stack.Navigator screenOptions={{}}>
              <Stack.Screen name="Homepage" component={Homepage} {...HomepageProps} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Movie" component={Movie} options={{headerShown: false}} />
            </Stack.Navigator>
          </SafeAreaProvider>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
