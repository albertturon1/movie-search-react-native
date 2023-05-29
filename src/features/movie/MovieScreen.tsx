import {DateTime} from 'luxon';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

import {MoviesCarousel} from '@components/FilmCarousel/MovieCarousel';
import {FilmBackdropImagesCarousel} from '@components/misc/FilmBackdropImagesCarousel';
import FilmCastCarousel from '@components/misc/FilmCastCarousel';
import {FilmGenres} from '@components/misc/FilmGenres';
import {FilmHeader} from '@components/misc/FilmHeader';
import {FilmPoster} from '@components/misc/FilmPoster';
import {FilmSection} from '@components/misc/FilmSection';
import MoviePopularity from '@components/MoviePopularity';
import ScreenPadding from '@components/ScreenPadding';
import useFilmRecommendations from '@hooks/useFilmRecommendations';
import {useFilmTrailerSource} from '@hooks/useFilmTrailerSource';
import {RootStackProps} from '@interfaces/INavigation';
import {
  useMovieQuery,
  useMovieImagesQuery,
  useMovieVideosQuery,
  useMovieCreditsQuery,
  useMovieRecommendationsQuery,
} from '@redux/api/hooks/moviesApiHooks';
import {getFilmOverview, getReleaseDateFormated} from '@src/lib/utils';

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

  const overview = getFilmOverview(movieInitialData.overview);
  const trailerVideo = useFilmTrailerSource(videos?.results);
  const sortedRecommendations = useFilmRecommendations({
    data: recommendationsQuery?.data?.results,
    selectedFilmID: movieInitialData.id,
  });

  const releaseDate =
    !!movieInitialData.release_date.length &&
    DateTime.fromISO(movieInitialData.release_date).toFormat('dd MMMM, yyyy');

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <ScreenPadding>
        <View style={styles.container}>
          <FilmHeader
            releaseDate={getReleaseDateFormated(movieInitialData.release_date)}
            runtime={movie?.runtime}
            adult={movieInitialData.adult}
            name={movieInitialData.title}
          />
          <FilmSection
            data={trailerVideo}
            isLoading={isVideoLoading}
            skeletonClassName="h-[200px]">
            {data => <YoutubePlayer height={200} videoId={data.key} />}
          </FilmSection>
          <View className="flex flex-row w-full">
            <View className="flex flex-row min-w-[120px] w-[30%] max-w-[300px] overflow-hidden">
              <FilmPoster
                path={movieInitialData.poster_path}
                containerClassName="w-full h-full"
              />
            </View>
            <View className="flex flex-1 mt-1 ml-2">
              {movie && <FilmGenres genres={movie.genres.slice(0, 3)} />}
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
            <FilmSection
              title="Cast"
              {...creditsQuery}
              skeletonClassName="h-[255px]">
              {data => <FilmCastCarousel cast={data.cast} />}
            </FilmSection>
            <FilmSection
              title="Backdrops"
              {...imagesQuery}
              titleClassName="-mb-2"
              skeletonClassName="h-[210px]">
              {data => <FilmBackdropImagesCarousel images={data.backdrops} />}
            </FilmSection>
            <FilmSection
              title="Recommendations"
              {...recommendationsQuery}
              skeletonClassName="h-[270px]">
              {() => <MoviesCarousel movies={sortedRecommendations} />}
            </FilmSection>
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
