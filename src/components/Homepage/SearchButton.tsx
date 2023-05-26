import {useNavigation} from '@react-navigation/native';
import {Pressable, View} from 'react-native';

const SearchButton: React.FC = () => {
  const navigation = useNavigation();
  const onPress = () => navigation.navigate('Search' as never);
  return (
    <Pressable style={{width: 44, justifyContent: 'center', alignItems: 'center'}} onPress={onPress}>
      <View>
        {/* <Icon source={require('../../../assets/icons/searchActive.png')} resizeMode="contain" /> */}
      </View>
    </Pressable>
  );
};
export default SearchButton;
