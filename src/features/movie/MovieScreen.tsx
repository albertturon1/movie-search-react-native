import {useMemo} from 'react';

import {DateTime} from 'luxon';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

import MovieGenres from '@components/Movie/MovieGenres';
import MoviePopularity from '@components/MoviePopularity';
import ScreenPadding from '@components/ScreenPadding';
import {RootStackProps} from '@interfaces/INavigation';
import {
  useMovieQuery,
  useMovieImagesQuery,
  useMovieVideosQuery,
  useMovieCreditsQuery,
  useMovieRecommendationsQuery,
} from '@redux/api/hooks/moviesApiHooks';

import MovieBackdropImagesCarousel from './components/MovieBackdropImagesCarousel';
import MovieCastCarousel from './components/MovieCastCarousel';
import {MovieHeader} from './components/MovieHeader';
import MoviePoster from './components/MoviePoster';
import MovieRecommendationsCarousel from './components/MovieRecommendationsCarousel';
import MovieSection from './components/MovieSection';

export const MovieScreen = ({route}: RootStackProps<'Movie'>) => {
  const {movie: movieInitialData} = route.params;
  const {data: movie} = useMovieQuery(movieInitialData.id);
  const imagesQuery = useMovieImagesQuery(movieInitialData.id);
  const {data: videos, isLoading: isVideoLoading} = useMovieVideosQuery(
    movieInitialData.id,
  );
  const creditsQuery = useMovieCreditsQuery(movieInitialData.id);
  const recommendationsQuery = useMovieRecommendationsQuery(
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

  const releaseDate =
    !!movieInitialData.release_date.length &&
    DateTime.fromISO(movieInitialData.release_date).toFormat('dd MMMM, yyyy');

  const sortedRecommendations = useMemo(() => {
    if (!recommendationsQuery?.data) return [];
    return [...recommendationsQuery.data.results]
      .filter(
        (v, i, a) =>
          v.id !== movieInitialData.id &&
          a.findIndex(v2 => v2.id === v.id) === i,
      )
      .sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
  }, [movieInitialData.id, recommendationsQuery.data]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <ScreenPadding>
        <View style={styles.container}>
          <MovieHeader movieInitialData={movieInitialData} movie={movie} />
          <MovieSection
            data={trailerVideo}
            isLoading={isVideoLoading}
            skeletonClassName="h-[200px]">
            {data => <YoutubePlayer height={200} videoId={data.key} />}
          </MovieSection>
          <View className="flex flex-row w-full">
            <View className="flex flex-row min-w-[120px] w-[30%] max-w-[300px] overflow-hidden">
              <MoviePoster
                path={movieInitialData.poster_path}
                containerClassName="w-full h-full"
              />
            </View>
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
              {releaseDate && (
                <Text className="text-[16px] text-secondaryBlack">{`Release date: ${releaseDate}`}</Text>
              )}
              <Text className="text-[16px]">{`Original language: ${movieInitialData.original_language.toUpperCase()}`}</Text>
            </View>
          </View>
          <View style={styles.sectionsWrapper}>
            <MovieSection
              title="Cast"
              {...creditsQuery}
              skeletonClassName="h-[255px]">
              {data => <MovieCastCarousel cast={data.cast} />}
            </MovieSection>
            <MovieSection
              title="Backdrops"
              {...imagesQuery}
              titleClassName="-mb-2"
              skeletonClassName="h-[210px]">
              {data => <MovieBackdropImagesCarousel images={data.backdrops} />}
            </MovieSection>
            <MovieSection
              title="Recommendations"
              {...recommendationsQuery}
              skeletonClassName="h-[270px] bg-red-300">
              {() => (
                <MovieRecommendationsCarousel
                  recommendations={sortedRecommendations}
                />
              )}
            </MovieSection>
          </View>
        </View>
      </ScreenPadding>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {paddingBottom: 300},
  container: {
    rowGap: 16,
    paddingTop: 12,
  },
  sectionsWrapper: {
    rowGap: 20,
  },
});
