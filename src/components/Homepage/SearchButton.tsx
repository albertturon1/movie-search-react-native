import React from 'react';
import styled from 'styled-components';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
