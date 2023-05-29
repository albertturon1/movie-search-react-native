import {useNavigation} from '@react-navigation/native';
import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';

import {FilmPoster} from '@components/misc/FilmPoster';
import {FilmYearRuntimeAdult} from '@components/misc/FilmYearRuntimeAdult';
import {RootStackProps} from '@interfaces/INavigation';
import {TvShort} from '@interfaces/models/ITv';

import {FilmCarousel} from './FilmCarousel';

export const TvCarousel = ({movies}: {movies: TvShort[]}) => (
  <FilmCarousel data={movies} item={TvCarouselItem} />
);

export const TvCarouselItem = ({item}: {item: TvShort}) => {
  const navigation = useNavigation<RootStackProps<'Movie'>['navigation']>();

  return (
    <Pressable
      onPress={() => {
        navigation.push('Tv', {
          tv: item,
        });
      }}>
      <View className="flex flex-col pr-1.5">
        <FilmPoster path={item.poster_path} />
        <View className="h-[70px] flex flex-col mt-1 justify-between">
          <Text numberOfLines={3}>{item.name}</Text>
          <FilmYearRuntimeAdult releaseDate={''} adult={item.adult} />
        </View>
      </View>
    </Pressable>
  );
};
