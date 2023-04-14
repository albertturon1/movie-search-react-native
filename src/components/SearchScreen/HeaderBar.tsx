import { View } from 'react-native';
import React from 'react';
import { Searchbar } from 'react-native-paper';
import colors from '../../theme/colors';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  autoFocus: boolean;
}

const HeaderBar: React.FC<Props> = ({ value, onChangeText, placeholder, autoFocus }) => {
  const navigation = useNavigation();
  const goBack = () => navigation.navigate('Homepage' as never);

  return (
    <View style={{ flexDirection: 'row' }}>
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