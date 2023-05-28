import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Theme from '@src/Theme';

const MovieBackArrow = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
      className="absolute -top-3 -left-4 p-4 z-50">
      <MaterialCommunityIcons
        name="arrow-left"
        color={Theme.colors.black}
        size={25}
      />
    </Pressable>
  );
};

export default MovieBackArrow;
