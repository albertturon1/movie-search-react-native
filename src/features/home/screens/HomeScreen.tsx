import {View, StyleSheet, ScrollView} from 'react-native';

import {MoviesCarousel} from '@components/FilmCarousel/MoviesCarousel';
import {TvCarousel} from '@components/FilmCarousel/TvCarousel';
import {FilmSection} from '@components/misc/FilmSection';
import ScreenPadding from '@components/ScreenPadding';
import {HomeStackProps} from '@interfaces/INavigation';
import {
  useTrendingMoviesQuery,
  useTrendingTvQuery,
  useUpcomingMoviesQuery,
} from '@redux/api/hooks/moviesApiHooks';

import {HomeUpcomingCarousel} from '../components/HomeUpcomingCarousel';
import SectionHeader from '../components/SectionHeader';

export const HomeScreen = ({navigation}: HomeStackProps<'Home'>) => {
  const trendingMoviesQuery = useTrendingMoviesQuery(1);
  const trendingTvSeriesQuery = useTrendingTvQuery(1);
  const upcomingMoviesQuery = useUpcomingMoviesQuery(1);

  return (
    <ScrollView>
      <View style={styles.container}>
        <FilmSection {...upcomingMoviesQuery}>
          {data => (
            <View className="flex flex-col gap-y-2 bg-black rounded-b-md">
              <View className="border-b border-border pb-2">
                <HomeUpcomingCarousel movies={data.results} />
              </View>
              <View className="pt-1 pb-2">
                <SectionHeader
                  titleClassName="text-2xl"
                  title="Upcoming movies"
                  buttonTitle="All"
                  onButtonPress={() => {
                    navigation.navigate('UpcomingMovies');
                  }}
                />
              </View>
            </View>
          )}
        </FilmSection>
        <FilmSection {...trendingMoviesQuery} containerClassName="h-[275px]">
          {data => (
            <>
              <SectionHeader
                title="Trending movies"
                buttonTitle="All"
                onButtonPress={() => {
                  navigation.navigate('MoviesTrending');
                }}
              />
              <ScreenPadding flex={false}>
                <View className="w-full">
                  <MoviesCarousel movies={data.results} />
                </View>
              </ScreenPadding>
            </>
          )}
        </FilmSection>
        <FilmSection {...trendingTvSeriesQuery} containerClassName="h-[245px]">
          {data => (
            <>
              <SectionHeader
                title="Trending TV Series"
                buttonTitle="All"
                onButtonPress={() => {
                  navigation.navigate('TvTrending');
                }}
              />
              <ScreenPadding flex={false}>
                <TvCarousel movies={data.results} />
              </ScreenPadding>
            </>
          )}
        </FilmSection>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 20,
    width: '100%',
    height: '100%',
  },
});
