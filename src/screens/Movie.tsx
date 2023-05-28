import {useMemo} from 'react';

import {DateTime} from 'luxon';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

import MovieGenres from '@components/Movie/MovieGenres';
import MoviePopularity from '@components/MoviePopularity';
import ScreenPadding from '@components/ScreenPadding';
import {
  useMovieCreditsQuery,
  useMovieImagesQuery,
  useMovieQuery,
  useMovieRecommendationsQuery,
  useMovieVideosQuery,
} from '@redux/api/hooks/moviesApiHooks';

import MovieBackdropImagesCarousel from './MovieBackdropImagesCarousel';
import MovieCastCarousel from './MovieCastCarousel';
import {MovieHeader} from './MovieHeader';
import MoviePoster from './MoviePoster';
import MovieSection from './MovieSection';
import {RootStackProps} from '../navigation/INavigation';

const Movie = ({route}: RootStackProps<'Movie'>) => {
  const {movie: movieInitialData} = route.params;
  const {data: movie} = useMovieQuery(movieInitialData.id);
  const {data: images, isLoading: isImagesLoading} = useMovieImagesQuery(
    movieInitialData.id,
  );
  const {data: videos, isLoading: isVideoLoading} = useMovieVideosQuery(
    movieInitialData.id,
  );
  const {data: credits, isLoading: isCreditsLoading} = useMovieCreditsQuery(
    movieInitialData.id,
  );
  const {data: recommendations} = useMovieRecommendationsQuery(
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

  return (
    <ScrollView>
      <ScreenPadding>
        <View style={styles.container}>
          <MovieHeader movieInitialData={movieInitialData} movie={movie} />
          <MovieSection
            data={trailerVideo}
            isDataLoading={isVideoLoading}
            skeletonClassName="h-[200px]">
            {data => <YoutubePlayer height={200} videoId={data.key} />}
          </MovieSection>
          <View className="flex flex-row w-full">
            <MoviePoster movieInitialData={movieInitialData} />
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
          <View style={styles.sectionsWrapper}>
            <MovieSection
              title="Cast"
              data={credits}
              isDataLoading={isCreditsLoading}
              skeletonClassName="h-[255px]">
              {data => <MovieCastCarousel cast={data.cast} />}
            </MovieSection>
            <MovieSection
              title="Backdrops"
              data={images}
              isDataLoading={isImagesLoading}
              titleClassName="-mb-2"
              skeletonClassName="h-[210px]">
              {data => <MovieBackdropImagesCarousel images={data.backdrops} />}
            </MovieSection>
          </View>
        </View>
      </ScreenPadding>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
    marginBottom: 16,
    paddingTop: 12,
  },
  sectionsWrapper: {
    rowGap: 20,
  },
});

export default Movie;
