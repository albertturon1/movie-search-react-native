import {View} from 'react-native';
import {Text} from 'react-native-paper';

import {Movie, MovieShort} from '@components/interfaces/IMovieAPi';
import MovieBackArrow from '@components/Movie/MovieBackArrow';

import MovieYearRuntimeAdult from './MovieYearRuntimeAdult';

export const MovieHeader = ({
  movieInitialData,
  movie,
}: {
  movieInitialData: MovieShort;
  movie: Movie | undefined;
}) => (
  <View className="relative flex flex-col gap-y-1.5 px-10 overflow-hidden">
    <MovieBackArrow />
    <Text className="text-[27px] text-black leading-[34px] text-center font-medium">
      {movieInitialData.title}
    </Text>
    <MovieYearRuntimeAdult
      releaseDate={movieInitialData.release_date}
      adult={movieInitialData.adult}
      runtime={movie?.runtime}
    />
  </View>
);
