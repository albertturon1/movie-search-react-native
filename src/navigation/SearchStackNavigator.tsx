import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SearchStackParamList} from '@interfaces/INavigation';
import {SearchScreen} from '@src/features/search/SearchScreen';

const HomeStack = createNativeStackNavigator<SearchStackParamList>();

export const SearchStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Search">
    <HomeStack.Screen name="Search" component={SearchScreen} />
  </HomeStack.Navigator>
);
