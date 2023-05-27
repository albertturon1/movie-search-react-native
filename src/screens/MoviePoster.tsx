import {View, Image} from 'react-native';

import {
  MovieImagesResponse,
  MovieShort,
} from '@components/interfaces/IMovieAPi';
import {getTMDBImagePath} from '@src/lib/utils';

const DEFAULT_POSTER_ASPECT_RATIO = 0.667;

const MoviePoster = ({
  movieImages,
  movieInitialData,
}: {
  movieImages: MovieImagesResponse | undefined;
  movieInitialData: MovieShort;
}) => {
  const posterUri = getTMDBImagePath({
    path:
      movieImages && !!movieImages.posters.length
        ? movieImages.posters[0].file_path
        : movieInitialData.poster_path,
    size: 'w500',
  });
  const posterAspectRatio =
    movieImages && !!movieImages.posters.length
      ? movieImages.posters[0].aspect_ratio
      : DEFAULT_POSTER_ASPECT_RATIO;

  return (
    <View
      className="min-w-[120px] w-[30%] max-w-[300px] h-min border-0.5 border-border"
      style={{aspectRatio: posterAspectRatio}}>
      <Image source={{uri: posterUri}} className="object-cover w-full h-full" />
    </View>
  );
};

export default MoviePoster;
