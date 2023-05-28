import {useWindowDimensions} from 'react-native';

import {SCREEN_HORIZONTAL_PADDING} from '@constants/Globals';

export const useMovieCarouselOptions = () => {
  const {width} = useWindowDimensions();

  const carouselWidth = width - 2 * SCREEN_HORIZONTAL_PADDING;

  const options = {
    style: {
      width: carouselWidth,
    },
    loop: false,
    overscrollEnabled: false,
    pagingEnabled: false,
    snapEnabled: false,
    scrollAnimationDuration: 200,
    panGestureHandlerProps: {
      activeOffsetX: [-20, 20],
    },
  };

  return {carouselWidth, options};
};
