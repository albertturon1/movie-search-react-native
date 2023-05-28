import {memo} from 'react';

import {Image, Pressable, View} from 'react-native';

import {MovieShort} from '@interfaces/api/IMovieApi';
import {getTMDBImagePath} from '@src/lib/utils';
import Theme from '@src/Theme';

const MovieListItem = ({
  item,
  onPressFunc,
}: {
  item: MovieShort;
  onPressFunc?: () => void;
}) => (
  <View style={Theme.styles.flexOne}>
    <Pressable onPress={onPressFunc} style={Theme.styles.flexOne}>
      <View className="flex flex-1 m-0.5 overflow-hidden">
        <Image
          className="flex flex-1 border-0.5 object-cover"
          source={{
            uri: getTMDBImagePath({size: 'w300', path: item.poster_path}),
          }}
          style={{aspectRatio: 1 / 1.5}}
        />
      </View>
    </Pressable>
  </View>
);

const Memo = memo(MovieListItem);
export default Memo;
