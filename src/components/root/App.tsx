import {RootStackNavigator} from '@navigation/RootStackNavigator';

import {Providers} from './Providers';

export const App = () => (
  <Providers>
    <RootStackNavigator />
  </Providers>
);
