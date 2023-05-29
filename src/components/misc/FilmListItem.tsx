import {Pressable, View} from 'react-native';

import {FilmPoster} from '@components/misc/FilmPoster';
import Theme from '@src/Theme';

export const FilmListItem = ({
  posterPath,
  onPressFunc,
}: {
  posterPath: string;
  onPressFunc?: () => void;
}) => (
  <View style={Theme.styles.flexOne}>
    <Pressable onPress={onPressFunc} style={Theme.styles.flexOne}>
      <FilmPoster path={posterPath} />
    </Pressable>
  </View>
);
