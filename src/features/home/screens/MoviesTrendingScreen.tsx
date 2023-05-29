import {useCallback, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';

import LoadingIndicator from '@components/LoadingIndicator';
import ScreenPadding from '@components/ScreenPadding';
import {HomeStackProps} from '@interfaces/INavigation';
import {MovieShort} from '@interfaces/models/IMovie';
import {useTrendingMoviesQuery} from '@redux/api/hooks/moviesApiHooks';
import {usePrefetch} from '@redux/api/rootApi';

import {FilmListItem} from '../components/FilmListItem';

const keyExtractor = (item: MovieShort | null) =>
  item?.id.toString() ?? (Math.random() + 1).toString(36).substring(7);

export const MoviesTrendingScreen = () => {
  const navigation = useNavigation<HomeStackProps<'Home'>['navigation']>();
  const [page, setPage] = useState(1);

  const {
    data: moviesData,
    isLoading,
    isFetching,
    isError,
  } = useTrendingMoviesQuery(page);
  const listData = [...new Set(moviesData?.results)];

  const prefetchMovie = usePrefetch('movie');

  const renderItem = useCallback(
    ({item}: {item: MovieShort | null}) => {
      if (!item) return <View className="flex flex-1" />;
      return (
        <FilmListItem
          item={item}
          onPressFunc={() => {
            prefetchMovie(item.id);
            navigation.navigate('Movie', {movie: item});
          }}
        />
      );
    },
    [navigation, prefetchMovie],
  );

  const ListFooterComponent = useCallback(
    () => (
      <View className="h-40 w-full">{isFetching && <LoadingIndicator />}</View>
    ),
    [isFetching],
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
  const movies =
    remainder % 3 === 0
      ? listData
      : listData.concat(Array(3 - remainder).fill(null));

  return (
    <ScreenPadding>
      <Text>{'Trending movies'}</Text>
      <FlatList
        data={movies}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        removeClippedSubviews
        scrollEventThrottle={16}
        windowSize={25}
        numColumns={3}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          setPage(prev => prev + 1);
        }}
        ListFooterComponent={ListFooterComponent}
      />
    </ScreenPadding>
  );
};