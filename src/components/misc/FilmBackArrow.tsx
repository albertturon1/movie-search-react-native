import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {RootStackProps} from '@interfaces/INavigation';
import Theme from '@src/Theme';

export const FilmBackArrow = () => {
  const navigation = useNavigation<RootStackProps<'Movie'>['navigation']>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('AppBottomTab', {
          screen: 'HomeStackNavigator',
          params: {
            screen: 'Home',
          },
        });
      }}
      className="absolute -top-2 -left-3 p-4 z-50">
      <MaterialCommunityIcons
        name="arrow-left"
        color={Theme.colors.black}
        size={25}
      />
    </Pressable>
  );
};
