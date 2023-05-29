import {useCallback, useState} from 'react';

import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';

import LoadingIndicator from '@components/LoadingIndicator';
import {FilmListItem} from '@components/misc/FilmListItem';
import ScreenPadding from '@components/ScreenPadding';
import {HomeStackProps} from '@interfaces/INavigation';
import {TvShort} from '@interfaces/models/ITv';
import {useTrendingTvQuery} from '@redux/api/hooks/tvApiHooks';
import {useTvPrefetch} from '@src/features/tv/hooks/useTvPrefetch';

const keyExtractor = (item: TvShort | null) =>
  item?.id.toString() ?? (Math.random() + 1).toString(36).substring(7);

export const TvTrendingScreen = ({
  navigation,
}: HomeStackProps<'TvTrending'>) => {
  const [page, setPage] = useState(1);

  const {data: tv, isLoading, isFetching, isError} = useTrendingTvQuery(page);
  const listData = [...new Set(tv?.results)];

  const prefetchTv = useTvPrefetch();

  const renderItem = useCallback(
    ({item}: {item: TvShort | null}) => {
      if (!item) return <View className="flex flex-1" />;
      return (
        <FilmListItem
          posterPath={item.poster_path}
          onPressFunc={() => {
            prefetchTv(item.id);
            navigation.navigate('Tv', {tv: item});
          }}
        />
      );
    },
    [navigation, prefetchTv],
  );

  const ListFooterComponent = useCallback(
    () => (
      <View className="h-40 w-full">
        {(isLoading || isFetching) && <LoadingIndicator />}
      </View>
    ),
    [isFetching, isLoading],
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <Text className="text-red-500">{'Error'}</Text>;
  }

  if (!listData || listData.length === 0)
    return (
      <ScreenPadding>
        <View className="flex flex-1 justify-center items-center">
          <Text className="text-2xl">{'Nothing to show for now'}</Text>
        </View>
      </ScreenPadding>
    );

  const remainder = listData.length % 3;
  const tvFilled =
    remainder % 3 === 0
      ? listData
      : listData.concat(Array(3 - remainder).fill(null));

  return (
    <ScreenPadding>
      <FlatList
        data={tvFilled}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        removeClippedSubviews
        scrollEventThrottle={16}
        windowSize={25}
        numColumns={3}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          setPage(prev => prev + 1);
        }}
        ListFooterComponent={ListFooterComponent}
      />
    </ScreenPadding>
  );
};
