import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters/extend';
import colors from '../theme/colors';
import { fsize, ftype } from '../theme/fonts';
import { Pressable } from 'react-native';

interface Props{
  value: string;
  onChangeText: () => void;
  placeholder? : string;
  autoFocus: boolean;
}

const SearchBar:React.FC<Props> = ({ value = '', onChangeText, placeholder = 'Search for a movie', autoFocus = false}) => {
  const clearIcon = require('../../assets/icons/clearInput.png')
  const clearInput = () => onChangeText('');
  return (
    <Container>
      <Wrapper>
        <LoopIconContainer>
          <LoopIcon source={require('../../assets/icons/search.png')} />
        </LoopIconContainer>
        <TextInput
          value={value}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          placeholder={placeholder} placeholderTextColor={colors.tertiaryBlack} underlineColorAndroid="transparent"
        />
      </Wrapper>
      {value.length > 0 ?
        < Pressable onPress={clearInput} style={{flex:1}}>
          <ClearIconContainer>
            <ClearIcon source={clearIcon} />
          </ClearIconContainer>
        </Pressable> : null
      }
    </Container >
  );
}

export default SearchBar;

const Container = styled.View`
  width: 100%;
  height: ${verticalScale(48)}px;
  flex-direction: row;
  /* align-items: center; */
  overflow: hidden;
`;
const Wrapper = styled.View`
  width: 100%;
  height: ${moderateVerticalScale(38, 0.6)}px;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  border-color: ${colors.grey};
  border-radius: 10px;
  padding: 0 ${scale(10)}px;
  overflow: hidden;
`;

const LoopIconContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-right: ${scale(5)}px;
`;
const LoopIcon = styled.Image`
  height: ${scale(16)}px;
  width: ${scale(16)}px;
`;
const TextInput = styled.TextInput`
  flex:1;
  font-family: ${ftype.regular};
  font-size: ${fsize.s15}px;
  color: ${colors.secondaryBlack};
  padding: 0;
  padding-right: ${scale(35)}px;
  overflow: hidden;
`;

const ClearIconContainer = styled.View`
  position: absolute;
  right: ${scale(-5)}px;
  width: ${scale(55)}px;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 10;
`
const ClearIcon = styled.Image`
  width: ${scale(16)}px;
  height: ${scale(16)}px;
  margin-bottom: ${verticalScale(7)}px;
`
