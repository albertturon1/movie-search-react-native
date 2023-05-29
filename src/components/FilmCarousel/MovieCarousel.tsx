import {useNavigation} from '@react-navigation/native';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';

import {FilmPoster} from '@components/misc/FilmPoster';
import {FilmYearRuntimeAdult} from '@components/misc/FilmYearRuntimeAdult';
import {RootStackProps} from '@interfaces/INavigation';
import {MovieShort} from '@interfaces/models/IMovie';
import {getReleaseDateFormated} from '@src/lib/utils';

import {FilmCarousel} from './FilmCarousel';

export const MoviesCarousel = ({movies}: {movies: MovieShort[]}) => (
  <FilmCarousel data={movies} item={MovieCarouselItem} />
);

export const MovieCarouselItem = ({item}: {item: MovieShort}) => {
  const navigation = useNavigation<RootStackProps<'Movie'>['navigation']>();

  return (
    <Pressable
      onPress={() => {
        navigation.push('Movie', {
          movie: item,
        });
      }}>
      <View className="flex flex-col pr-1.5">
        <FilmPoster path={item.poster_path} />
        <View className="h-[70px] flex flex-col mt-1 justify-between">
          <Text numberOfLines={3}>{item.title}</Text>
          <FilmYearRuntimeAdult
            releaseDate={getReleaseDateFormated(item.release_date)}
            adult={item.adult}
          />
        </View>
      </View>
    </Pressable>
  );
};
