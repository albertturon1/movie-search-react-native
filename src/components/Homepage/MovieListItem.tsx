import React from 'react';
import styled from 'styled-components';
import {Pressable, View} from 'react-native';
import { Movie } from '../../services/moviesApi';

interface Props {
  item: Movie;
  onPressFunc?: () => void;
}
const MovieListItem: React.FC<Props> = ({item, onPressFunc}) => {

  return (
    <View style={{flex: 1}}>
      <Pressable onPress={onPressFunc} style={{flex: 1}}>
        <Container>
          <Thumbnail source={{uri: `https://image.tmdb.org/t/p/w300/${item.poster_path}`}} style={{aspectRatio: 1/1.5}} resizeMode='cover'/>
        </Container>
      </Pressable>
    </View>
  );
};

export default MovieListItem;

const Container = styled.View`
  flex: 1;
  margin: 2px;
  overflow: hidden;
`;
const Thumbnail = styled.Image`
  flex: 1;
  border-radius: 2px;
`;
