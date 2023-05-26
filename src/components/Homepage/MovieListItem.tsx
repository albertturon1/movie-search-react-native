import React from 'react';

import {Pressable, View} from 'react-native';
import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

import { Movie } from '@components/interfaces/IMovieAPi';
import Theme from '@src/Theme';

interface Props {
  item: Movie;
  onPressFunc?: () => void;
}
const MovieListItem: React.FC<Props> = ({item, onPressFunc}) => (
    <View style={Theme.styles.flexOne}>
      <Pressable onPress={onPressFunc} style={Theme.styles.flexOne}>
        <View className='flex flex-1 m-0.5 overflow-hidden'>
          <Image className='flex flex-1 border-0.5 object-cover' source={{uri: `https://image.tmdb.org/t/p/w300/${item.poster_path}`}} style={{aspectRatio: 1/1.5}}/>
        </View>
      </Pressable>
    </View>
  );

export default MovieListItem;