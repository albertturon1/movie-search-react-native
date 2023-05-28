import {ReactNode} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';

import {store} from '@redux/store';
import Theme from '@src/Theme';

export const Providers = ({children}: {children: ReactNode}) => (
  <GestureHandlerRootView style={Theme.styles.flexOne}>
    <ReduxProvider store={store}>
      <NavigationContainer theme={Theme}>
        <PaperProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
          <StatusBar
            backgroundColor={Theme.colors.background}
            barStyle="dark-content"
          />
        </PaperProvider>
      </NavigationContainer>
    </ReduxProvider>
  </GestureHandlerRootView>
);
