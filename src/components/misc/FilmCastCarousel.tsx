import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Cast} from '@interfaces/models/IFilm';
import {useMovieCarouselOptions} from '@src/features/movie/hooks/useMovieCarouselOptions';
import {getTMDBImagePath} from '@src/lib/utils';

export const FilmCastCarousel = ({cast}: {cast: Cast[]}) => {
  const {carouselWidth, options} = useMovieCarouselOptions();

  if (!cast || !cast.length) return null;
  return (
    <Carousel
      {...options}
      width={carouselWidth / 3.2}
      height={220}
      data={cast}
      renderItem={Item}
    />
  );
};

const Item = ({item}: {item: Cast}) => (
  <View className="h-full flex flex-col pr-1.5">
    <View className="flex-1 object-contain max-h-full justify-center items-center">
      {item.profile_path ? (
        <Image
          source={{
            uri: getTMDBImagePath({path: item.profile_path, size: 'w154'}),
          }}
          className="w-full h-full bg-muted"
        />
      ) : (
        <View className="bg-muted h-full w-full flex justify-center items-center">
          <FontAwesome name="user-circle" size={100} />
        </View>
      )}
    </View>
    <View className="h-[70px] flex flex-col mt-1 justify-between">
      <Text>{item.name}</Text>
      <Text className="text-black/70">{item.character}</Text>
    </View>
  </View>
);

export default FilmCastCarousel;
