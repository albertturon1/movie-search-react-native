import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  autoFocus: boolean;
}

const HeaderBar = ({ value, onChangeText, placeholder, autoFocus }: Props) => {
  const navigation = useNavigation();
  const goBack = () => navigation.navigate('Homepage' as never);

  return (
    <View className='flex flex-1'>
      {/* <BackArrowWrapper>
        <Icon.Button name="arrowleft" backgroundColor="#fff" color="#000" onPress={goBack} />
      </BackArrowWrapper>
      <SearchBarWrapper>
        <Searchbar value={value} onChangeText={onChangeText} autoFocus={autoFocus} placeholder={placeholder} />
      </SearchBarWrapper> */}
    </View>
  );
};

export default HeaderBar;