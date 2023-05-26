import {useNavigation} from '@react-navigation/native';
import {Pressable, View} from 'react-native';

const SearchButton: React.FC = () => {
  const navigation = useNavigation();
  const onPress = () => navigation.navigate('Search' as never);
  return (
    <Pressable
      className="flex w-11 justify-center items-center"
      onPress={onPress}>
      <View>
        {/* <Icon source={require('../../../assets/icons/searchActive.png')} resizeMode="contain" /> */}
      </View>
    </Pressable>
  );
};
export default SearchButton;
