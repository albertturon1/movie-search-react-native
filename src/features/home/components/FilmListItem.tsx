import {Pressable, View} from 'react-native';

import {FilmPoster} from '@components/misc/FilmPoster';
import {MovieShort} from '@interfaces/models/IMovie';
import Theme from '@src/Theme';

export const FilmListItem = ({
  item,
  onPressFunc,
}: {
  item: MovieShort;
  onPressFunc?: () => void;
}) => (
  <View style={Theme.styles.flexOne}>
    <Pressable onPress={onPressFunc} style={Theme.styles.flexOne}>
      <FilmPoster path={item.poster_path} />
    </Pressable>
  </View>
);
