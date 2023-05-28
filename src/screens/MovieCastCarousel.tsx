import {SetStateAction, useState} from 'react';

import {
  View,
  useWindowDimensions,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {Text} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';

import DefaultPerson from '@assets/images/default_person.png';
import {MovieCast} from '@components/interfaces/IMovieAPi';
import {getTMDBImagePath} from '@src/lib/utils';

const MovieCastCarousel = ({cast}: {cast: MovieCast[]}) => {
  const {width} = useWindowDimensions();
  const carouselWidth = width - 2 * 12;

  if (!cast || !cast.length) return null;
  return (
    <Carousel
      loop={false}
      width={carouselWidth / 3.2}
      height={220}
      style={{
        width: carouselWidth,
      }}
      data={cast}
      scrollAnimationDuration={300}
      renderItem={Item}
      overscrollEnabled={false}
      pagingEnabled={false}
      panGestureHandlerProps={{
        activeOffsetX: [-20, 20],
      }}
    />
  );
};

const Item = ({item}: {item: MovieCast}) => {
  const [source, setSource] = useState<ImageSourcePropType>({
    uri: getTMDBImagePath({path: item.profile_path, size: 'w154'}),
  });

  return (
    <View className="h-full flex flex-col pr-1.5">
      <View className="flex-1 object-contain max-h-full">
        <Image
          source={source}
          className="w-full h-full bg-muted"
          onError={() => {
            setSource(DefaultPerson as SetStateAction<ImageSourcePropType>);
          }}
        />
      </View>
      <View className="h-[70px] flex flex-col mt-1">
        <Text>{item.name}</Text>
        <Text className="text-black/70">{item.character}</Text>
      </View>
    </View>
  );
};

export default MovieCastCarousel;
