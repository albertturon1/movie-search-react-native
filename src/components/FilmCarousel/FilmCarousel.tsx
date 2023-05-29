import Carousel from 'react-native-reanimated-carousel';
import {CarouselRenderItem} from 'react-native-reanimated-carousel/lib/typescript/types';

import {useFilmCarouselOptions} from '@hooks/useFilmCarouselOptions';
import {AnyObject} from '@interfaces/IUtility';

export const FilmCarousel = <T extends AnyObject<T>>({
  data,
  item,
}: {
  data: T[];
  item: CarouselRenderItem<T>;
}) => {
  const {carouselWidth, options} = useFilmCarouselOptions();

  if (!data || !data.length) return null;
  return (
    <Carousel
      {...options}
      width={carouselWidth / 3.2}
      data={data}
      renderItem={value => item(value)}
    />
  );
};
