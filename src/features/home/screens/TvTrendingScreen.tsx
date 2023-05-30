import {useState} from 'react';

import {HomeStackProps} from '@interfaces/INavigation';
import {useTrendingTvQuery} from '@redux/api/hooks/tvApiHooks';
import {useTvPrefetch} from '@src/features/tv/hooks/useTvPrefetch';

import {FilmScrollList} from '../components/FilmScrollList';

export const TvTrendingScreen = ({
  navigation,
}: HomeStackProps<'TvTrending'>) => {
  const [page, setPage] = useState(1);

  const {data, isLoading, isFetching, isError} = useTrendingTvQuery(page);

  const prefetchTv = useTvPrefetch();

  return (
    <FilmScrollList
      data={data?.results}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={isError}
      onItemPress={item => {
        navigation.navigate('Tv', {
          tv: item,
        });
        prefetchTv(item.id);
      }}
      onEndReached={() => {
        setPage(prev => prev + 1);
      }}
    />
  );
};
