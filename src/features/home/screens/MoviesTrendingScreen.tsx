import {useState} from 'react';

import {useNavigation} from '@react-navigation/native';

import {HomeStackProps} from '@interfaces/INavigation';
import {useTrendingMoviesQuery} from '@redux/api/hooks/moviesApiHooks';
import {useMoviePrefetch} from '@src/features/movie/hooks/useMoviePrefetch';

import {FilmScrollList} from '../components/FilmScrollList';

export const MoviesTrendingScreen = () => {
  const navigation = useNavigation<HomeStackProps<'Home'>['navigation']>();
  const [page, setPage] = useState(1);

  const {data, isLoading, isFetching, isError} = useTrendingMoviesQuery(page);

  const prefetchMovie = useMoviePrefetch();

  return (
    <FilmScrollList
      data={data?.results}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      onItemPress={item => {
        navigation.navigate('Movie', {
          movie: item,
        });
        prefetchMovie(item.id);
      }}
      onEndReached={() => {
        setPage(prev => prev + 1);
      }}
    />
  );
};
