import {View, StyleSheet, ScrollView} from 'react-native';

import {MoviesCarousel} from '@components/FilmCarousel/MoviesCarousel';
import {TvCarousel} from '@components/FilmCarousel/TvCarousel';
import {FilmSection} from '@components/misc/FilmSection';
import ScreenPadding from '@components/ScreenPadding';
import {HomeStackProps} from '@interfaces/INavigation';
import {
  useTrendingMoviesQuery,
  useTrendingTvQuery,
} from '@redux/api/hooks/moviesApiHooks';

import SectionHeader from '../components/SectionHeader';

export const HomeScreen = ({navigation}: HomeStackProps<'Home'>) => {
  const trendingMovies = useTrendingMoviesQuery(1);
  const trendingTvSerieses = useTrendingTvQuery(1);

  return (
    <ScrollView>
      <View style={styles.container}>
        <FilmSection {...trendingMovies} containerClassName="h-[275px]">
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
        <FilmSection {...trendingTvSerieses} containerClassName="h-[245px]">
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
  container: {rowGap: 20},
});
