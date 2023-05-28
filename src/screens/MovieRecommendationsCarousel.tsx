import {useNavigation} from '@react-navigation/native';
import {View, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

import {MovieShort} from '@interfaces/api/IMovieApi';
import {RootStackProps} from '@interfaces/INavigation';

import {useMovieCarouselOptions} from './Home/useMovieCarouselOptions';
import MoviePoster from './MoviePoster';
import MovieYearRuntimeAdult from './MovieYearRuntimeAdult';

const MovieRecommendationsCarousel = ({
  recommendations,
}: {
  recommendations: MovieShort[];
}) => {
  const {carouselWidth, options} = useMovieCarouselOptions();

  if (!recommendations || !recommendations.length) return null;
  return (
    <Carousel
      {...options}
      width={carouselWidth / 3.2}
      data={recommendations}
      renderItem={Item}
    />
  );
};

const Item = ({item}: {item: MovieShort}) => {
  const navigation = useNavigation<RootStackProps<'Movie'>['navigation']>();

  return (
    <Pressable
      onPress={() => {
        navigation.push('Movie', {
          movie: item,
        });
      }}>
      <View className="h-full flex flex-col pr-1.5">
        <MoviePoster path={item.poster_path} />
        <View className="h-[70px] flex flex-col mt-1 justify-between">
          <Text numberOfLines={3}>{item.title}</Text>
          <MovieYearRuntimeAdult
            releaseDate={item.release_date}
            adult={item.adult}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default MovieRecommendationsCarousel;
