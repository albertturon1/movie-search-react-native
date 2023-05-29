import {memo} from 'react';

import {View, Image} from 'react-native';
import {Text} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useFilmCarouselOptions} from '@hooks/useFilmCarouselOptions';
import {Cast} from '@interfaces/models/IFilm';
import {getTMDBImagePath} from '@src/lib/utils';

const FilmCastCarouselBase = ({cast}: {cast: Cast[]}) => {
  const {carouselWidth, options} = useFilmCarouselOptions();

  if (!cast || !cast.length) return null;
  return (
    <Carousel
      windowSize={7}
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
    <View className="flex-1 object-contain max-h-full justify-center items-center bg-muted">
      {item.profile_path ? (
        <Image
          source={{
            uri: getTMDBImagePath({path: item.profile_path, size: 'w154'}),
          }}
          className="w-full h-full bg-muted"
        />
      ) : (
        <View className="h-full w-full flex justify-center items-center">
          <FontAwesome name="user-circle" size={100} />
        </View>
      )}
    </View>
    <View className="h-[70px] flex flex-col mt-1 justify-between">
      <Text numberOfLines={2}>{item.name}</Text>
      <Text numberOfLines={2} className="text-black/70">
        {item.character}
      </Text>
    </View>
  </View>
);

export const FilmCastCarousel = memo(FilmCastCarouselBase);
