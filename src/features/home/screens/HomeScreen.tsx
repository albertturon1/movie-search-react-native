import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';

import {MoviesCarousel} from '@components/FilmCarousel/MovieCarousel';
import {TvCarousel} from '@components/FilmCarousel/TvCarousel';
import {FilmSection} from '@components/misc/FilmSection';
import ScreenPadding from '@components/ScreenPadding';
import {
  useTrendingMoviesQuery,
  useTrendingTvQuery,
} from '@redux/api/hooks/moviesApiHooks';

export const HomeScreen = () => {
  const trendingMovies = useTrendingMoviesQuery(1);
  const trendingTvSerieses = useTrendingTvQuery(1);

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <ScreenPadding>
        <View style={styles.container}>
          <FilmSection {...trendingMovies} containerClassName="h-[215px]">
            {data => (
              <>
                <Text className="text-xl font-bold mb-2">
                  {'Trending movies'}
                </Text>
                <MoviesCarousel movies={data.results} />
              </>
            )}
          </FilmSection>
          <FilmSection {...trendingTvSerieses} containerClassName="h-[215px]">
            {data => (
              <>
                <Text className="text-xl font-bold mb-2">{'Trending Tv'}</Text>
                <TvCarousel movies={data.results} />
              </>
            )}
          </FilmSection>
        </View>
      </ScreenPadding>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {paddingBottom: 100},
  container: {
    rowGap: 100,
    paddingTop: 12,
  },
});
