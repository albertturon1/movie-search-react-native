import React from 'react';
import styled from 'styled-components';
import {Pressable} from 'react-native';
import {scale} from 'react-native-size-matters/extend';
import {useNavigation} from '@react-navigation/native';

const SearchButton: React.FC = () => {
  const navigation = useNavigation();
  const onPress = () => navigation.navigate('Search' as never);
  return (
    <Pressable style={{width: 44, justifyContent: 'center', alignItems: 'center'}} onPress={onPress}>
      <Container>
        <Icon source={require('../../../assets/icons/searchActive.png')} resizeMode="contain" />
      </Container>
    </Pressable>
  );
};
export default SearchButton;

const Container = styled.View`
  width: ${scale(20)}px;
  height: ${scale(44)}px;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.Image`
  width: 100%;
  height: 100%;
`;
