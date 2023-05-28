import {View, Image} from 'react-native';

import {MovieShort} from '@components/interfaces/IMovieAPi';
import {getTMDBImagePath} from '@src/lib/utils';

const DEFAULT_POSTER_ASPECT_RATIO = 0.667;

const MoviePoster = ({movieInitialData}: {movieInitialData: MovieShort}) => (
  <View
    className="min-w-[120px] w-[30%] max-w-[300px] h-min border-0.5 border-border"
    style={{aspectRatio: DEFAULT_POSTER_ASPECT_RATIO}}>
    <Image
      source={{
        uri: getTMDBImagePath({
          path: movieInitialData.poster_path,
          size: 'w500',
        }),
      }}
      className="object-cover w-full h-full"
    />
  </View>
);

export default MoviePoster;
