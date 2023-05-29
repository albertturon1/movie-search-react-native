import {View, useWindowDimensions, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import {FilmImage} from '@interfaces/models/IFilm';
import {getTMDBImagePath} from '@src/lib/utils';

import {useMovieCarouselOptions} from '../../features/movie/hooks/useMovieCarouselOptions';

export const FilmBackdropImagesCarousel = ({images}: {images: FilmImage[]}) => {
  const {width} = useWindowDimensions();
  const {carouselWidth, options} = useMovieCarouselOptions();

  if (!images || !images.length) return null;
  return (
    <Carousel
      {...options}
      width={carouselWidth}
      height={width / 2}
      mode="parallax"
      data={images}
      pagingEnabled
      renderItem={Item}
    />
  );
};

const Item = ({item}: {item: FilmImage}) => (
  <View className="w-full" style={{aspectRatio: item.aspect_ratio}}>
    <Image
      source={{
        uri: getTMDBImagePath({path: item.file_path, size: 'w300'}),
      }}
      className="w-full h-full"
    />
  </View>
);
