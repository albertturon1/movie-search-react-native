import {useMemo} from 'react';

import {DateTime} from 'luxon';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

import {TvCarousel} from '@components/FilmCarousel/TvCarousel';
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
  useTvCreditsQuery,
  useTvImagesQuery,
  useTvQuery,
  useTvRecommendationsQuery,
  useTvVideosQuery,
} from '@redux/api/hooks/tvApiHooks';
import {getFilmOverview, getTvAirtimeFormated} from '@src/lib/utils';

export const TvScreen = ({route}: RootStackProps<'Tv'>) => {
  const {tv: tvInitialData} = route.params;
  const {data: tv} = useTvQuery(tvInitialData.id);
  const imagesQuery = useTvImagesQuery(tvInitialData.id);
  const {data: videos, isLoading: isVideoLoading} = useTvVideosQuery(
    tvInitialData.id,
  );
  const recommendationsQuery = useTvRecommendationsQuery(tvInitialData.id);
  const creditsQuery = useTvCreditsQuery(tvInitialData.id);

  const averageEpisodeRuntime = useMemo(
    // eslint-disable-next-line no-param-reassign
    () => tv?.episode_run_time.reduce((acc, item) => (acc += item), 0),
    [tv?.episode_run_time],
  );

  const trailerVideo = useFilmTrailerSource(videos?.results);

  const releaseDate =
    !!tvInitialData.first_air_date &&
    DateTime.fromISO(tvInitialData.first_air_date).toFormat('dd MMMM, yyyy');

  const sortedRecommendations = useFilmRecommendations({
    data: recommendationsQuery?.data?.results,
    selectedFilmID: tvInitialData.id,
  });

  const overview = getFilmOverview(tvInitialData.overview);
  const airtime = tv
    ? getTvAirtimeFormated(tv.first_air_date, tv?.last_air_date)
    : '';

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <ScreenPadding>
        <View style={styles.container}>
          <FilmHeader
            releaseDate={airtime}
            runtime={averageEpisodeRuntime}
            adult={tvInitialData.adult}
            name={tvInitialData.name}
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
                path={tvInitialData.poster_path}
                containerClassName="w-full h-full"
              />
            </View>
            <View className="flex flex-1 mt-1 ml-2">
              {tv && <FilmGenres genres={tv.genres.slice(0, 3)} />}
              <Text className="leading-[23px] mt-1">{overview}</Text>
            </View>
          </View>
          <View>
            <MoviePopularity
              voteCount={tvInitialData.vote_count}
              voteAverage={tvInitialData.vote_average}
            />
            <View className="flex flex-col gap-y-0.5 mb-2">
              {releaseDate && (
                <Text className="text-[16px] text-secondaryBlack">{`Release date: ${releaseDate}`}</Text>
              )}
              <Text className="text-[16px]">{`Original language: ${tvInitialData.original_language.toUpperCase()}`}</Text>
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
              {() => <TvCarousel movies={sortedRecommendations} />}
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
