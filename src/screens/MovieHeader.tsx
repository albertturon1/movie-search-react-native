import {DateTime} from 'luxon';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

import {Movie, MovieShort} from '@components/interfaces/IMovieAPi';
import Genres from '@components/Movie/Genres';
import MoviePopularity from '@components/MoviePopularity';

export const MovieHeader = ({
  movieInitialData,
  movie,
}: {
  movieInitialData: MovieShort;
  movie: Movie | undefined;
}) => {
  const releaseDate = DateTime.fromISO(movieInitialData.release_date).toFormat(
    'dd MMMM, yyyy',
  );
  return (
    <>
      <Text className="text-xl font-bold text-primaryBlack shrink mt-4">
        {movieInitialData.title}
      </Text>
      <View className="py-0.5">
        <MoviePopularity
          voteCount={movieInitialData.vote_count}
          voteAverage={movieInitialData.vote_average}
        />
      </View>
      <View className="flex flex-col gap-y-0.5 mb-2">
        {movieInitialData.release_date && (
          <Text className="text-[16px] text-secondaryBlack">{`Release date: ${releaseDate}`}</Text>
        )}
        {movieInitialData.original_language && (
          <Text className="text-[16px]">{`Original language: ${movieInitialData.original_language.toUpperCase()}`}</Text>
        )}
        {movieInitialData.adult && (
          <Text className="text-[16px] text-red-700">{`For adults`}</Text>
        )}
      </View>
      {movie && (
        <View className="mt-2">
          <Genres genres={movie.genres} />
        </View>
      )}
    </>
  );
};
