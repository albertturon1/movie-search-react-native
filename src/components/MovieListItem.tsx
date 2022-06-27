import React from 'react';
import styled from 'styled-components';
import {verticalScale} from 'react-native-size-matters/extend';
import {Pressable, Text, View} from 'react-native';

interface Props {
  item: {
    urls: {
      thumb: string;
    };
  };
  onPressFunc?: () => void;
}
const MovieListItem: React.FC<Props> = ({item, onPressFunc}) => {
  return (
    <View style={{flex: 1}}>
      <Pressable onPress={onPressFunc} style={{flex: 1}}>
        <Container>
          {/* <Thumbnail source={{uri: item.urls.thumb}}/> */}
        </Container>
      </Pressable>
    </View>
  );
};

export default MovieListItem;

const Container = styled.View`
  flex: 1;
  height: ${verticalScale(100)}px;
  margin: 2px;
  overflow: hidden;
`;
const Thumbnail = styled.Image`
  flex: 1;
  border-radius: 2px;
`;
