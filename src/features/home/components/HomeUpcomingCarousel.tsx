import {useState, useCallback} from 'react';

import {useWindowDimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {CarouselRenderItemInfo} from 'react-native-reanimated-carousel/lib/typescript/types';

import {YOUTUBE_ASPECT_RATIO} from '@constants/Globals';
import {MovieShort} from '@interfaces/models/IMovie';

import {HomeUpcomingCarousellItem} from './HomeUpcomingCarouselItem';

const NUM_OF_UPCOMING_MOVIES = 10;
const POSTER_HEIGHT = 120;

export const HomeUpcomingCarousel = ({movies}: {movies: MovieShort[]}) => {
  const {width} = useWindowDimensions();
  const [autoPlay, setAutoPlay] = useState(false);

  const slicedMovies = movies.slice(0, NUM_OF_UPCOMING_MOVIES);
  const [{id: firstMovieID}] = slicedMovies;

  const carouselHeight = width * YOUTUBE_ASPECT_RATIO + POSTER_HEIGHT / 2.5;

  const onFirstMovieReadySetAutplay = useCallback(
    (readyItemID: number) => {
      if (readyItemID !== firstMovieID) return;
      setTimeout(() => {
        setAutoPlay(true);
      }, 3);
    },
    [firstMovieID],
  );

  const renderItem = useCallback(
    (movieItem: CarouselRenderItemInfo<MovieShort>) => (
      <HomeUpcomingCarousellItem
        item={movieItem.item}
        onReady={onFirstMovieReadySetAutplay}
        posterHeight={POSTER_HEIGHT}
      />
    ),
    [onFirstMovieReadySetAutplay],
  );

  if (!slicedMovies || !slicedMovies.length) return null;
  return (
    <Carousel
      pagingEnabled
      snapEnabled
      overscrollEnabled={false}
      width={width}
      data={slicedMovies}
      autoPlay={autoPlay}
      autoPlayInterval={3000}
      windowSize={NUM_OF_UPCOMING_MOVIES}
      renderItem={renderItem}
      height={carouselHeight}
    />
  );
};
