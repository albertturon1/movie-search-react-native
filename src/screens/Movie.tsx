import {useMemo} from 'react';

import {DateTime} from 'luxon';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

import MovieGenres from '@components/Movie/MovieGenres';
import MoviePopularity from '@components/MoviePopularity';
import ScreenPadding from '@components/ScreenPadding';
import {Skeleton} from '@components/Skeleton';
import {
  useMovieImagesQuery,
  useMovieQuery,
  useMovieVideosQuery,
} from '@redux/api/hooks/moviesApiHooks';

import MovieBackdropImages from './MovieBackdropImages';
import {MovieHeader} from './MovieHeader';
import MoviePoster from './MoviePoster';
import {RootStackProps} from '../navigation/INavigation';

const Movie = ({route}: RootStackProps<'Movie'>) => {
  const {movie: movieInitialData} = route.params;
  const {data: movie} = useMovieQuery(movieInitialData.id);
  const {data: images} = useMovieImagesQuery(movieInitialData.id);
  const {data: videos, isLoading: isVideoLoading} = useMovieVideosQuery(
    movieInitialData.id,
  );
  const trailerVideo = useMemo(() => {
    if (!videos || !videos.results.length) return;
    return videos.results
      .filter(
        video =>
          video.type.toLowerCase() === 'trailer' &&
          video.official &&
          video.site === 'YouTube',
      )
      .sort((a, b) => (a.published_at < b.published_at ? 1 : -1))[0];
  }, [videos]);

  const overview =
    movieInitialData.overview.length >= 208
      ? `${movieInitialData.overview.slice(0, 205)}...`
      : movieInitialData.overview;

  const releaseDate = DateTime.fromISO(movieInitialData.release_date).toFormat(
    'dd MMMM, yyyy',
  );

  console.log(movie);

  return (
    <ScrollView>
      <ScreenPadding>
        <View className="mb-16 pt-3 flex flex-col gap-y-4 flex-1">
          <View className="flex flex-col gap-y-3">
            <MovieHeader movieInitialData={movieInitialData} movie={movie} />
            {isVideoLoading}
            {(trailerVideo || isVideoLoading) && (
              <View className="w-full h-[200px] bg-muted">
                {trailerVideo ? (
                  <YoutubePlayer height={200} videoId={trailerVideo.key} />
                ) : (
                  <Skeleton styleClassName="w-full h-full" />
                )}
              </View>
            )}
          </View>
          <View className="flex flex-row w-full">
            <MoviePoster movieInitialData={movieInitialData} images={images} />
            <View className="flex flex-1 mt-1 ml-2">
              {movie && <MovieGenres genres={movie.genres.slice(0, 3)} />}
              <Text className="leading-[23px] mt-1">{overview}</Text>
            </View>
          </View>
          <View>
            <MoviePopularity
              voteCount={movieInitialData.vote_count}
              voteAverage={movieInitialData.vote_average}
            />
            <View className="flex flex-col gap-y-0.5 mb-2">
              <Text className="text-[16px] text-secondaryBlack">{`Release date: ${releaseDate}`}</Text>
              <Text className="text-[16px]">{`Original language: ${movieInitialData.original_language.toUpperCase()}`}</Text>
            </View>
          </View>
          {images && (
            <View className="flex flex-col gap-y-1">
              <Text className="text-lg font-bold">{'Backdrops'}</Text>
              <MovieBackdropImages images={images.backdrops} />
            </View>
          )}
        </View>
      </ScreenPadding>
    </ScrollView>
  );
};

export default Movie;
