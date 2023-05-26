import {format} from 'fecha';
import {Image, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';

import ScreenPadding from '@components/ScreenPadding';
import {useGenresQuery} from '@redux/api/hooks/moviesApiHooks';

import Genres from '../components/Movie/Genres';
import MoviePopularity from '../components/MoviePopularity';
import {RootStackProps} from '../navigation/INavigation';

const Movie = ({route}: RootStackProps<'Movie'>) => {
  const {movie} = route.params;
  const {data: genresData} = useGenresQuery();

  const movieGenres = genresData?.genres.filter(genre =>
    movie.genre_ids.some(g2 => genre.id == g2),
  ); //filtering genres that are binded to selected movie
  const formattedReleaseDate = movie.release_date
    ? format(new Date(movie.release_date), 'mediumDate')
    : null;
  const photoAspectRatio = movie.backdrop_path ? 1.77 / 1 : 1 / 1.5;

  return (
    <>
      <LinearGradient
        className="w-full h-16 absolute top-0 z-10"
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.30)', 'rgba(0,0,0,0)']}
        locations={[0, 0.4, 1]}
      />
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780/${
              movie.backdrop_path ?? movie.poster_path
            }`,
          }}
          resizeMode="cover"
          style={{aspectRatio: photoAspectRatio}}
        />
        <ScreenPadding>
          <Text className="text-xl font-bold text-primaryBlack shrink mt-4 mb-1">
            {movie.title}
          </Text>
          <MoviePopularity
            voteCount={movie.vote_count}
            voteAverage={movie.vote_average}
          />
          <View className="flex flex-col gap-y-0.5 mb-2">
            {movie.release_date && formattedReleaseDate && (
              <Text className="text-[16px] text-secondaryBlack">{`Release date: ${formattedReleaseDate}`}</Text>
            )}
            {movie.original_language && (
              <Text className="text-[16px]">{`Original language: ${movie.original_language.toUpperCase()}`}</Text>
            )}
            {movie.adult && (
              <Text className="text-[16px] text-red-700">{`For adults`}</Text>
            )}
          </View>
          {!!movieGenres && <Genres genres={movieGenres} />}
          {!!movie.overview && (
            <Text className="mt-4 text-[16px] leading-[22px] text-secondaryBlack shrink">
              {movie.overview}
            </Text>
          )}
        </ScreenPadding>
      </ScrollView>
    </>
  );
};

export default Movie;
