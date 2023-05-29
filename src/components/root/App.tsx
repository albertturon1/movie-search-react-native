import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootStackNavigator} from '@navigation/RootStackNavigator';

import {Providers} from './Providers';

export const App = () => (
  <Providers>
    <SafeAreaView style={styles.container}>
      <RootStackNavigator />
    </SafeAreaView>
  </Providers>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
