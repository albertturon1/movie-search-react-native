import {useCallback, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';

import LoadingIndicator from '@components/LoadingIndicator';
import {FilmListItem} from '@components/misc/FilmListItem';
import ScreenPadding from '@components/ScreenPadding';
import {HomeStackProps} from '@interfaces/INavigation';
import {MovieShort} from '@interfaces/models/IMovie';
import {useUpcomingMoviesQuery} from '@redux/api/hooks/moviesApiHooks';
import {useMoviePrefetch} from '@src/features/movie/hooks/useMoviePrefetch';

const keyExtractor = (item: MovieShort | null) =>
  item?.id.toString() ?? (Math.random() + 1).toString(36).substring(7);

export const UpcomingMoviesScreen = () => {
  const navigation = useNavigation<HomeStackProps<'Home'>['navigation']>();
  const [page, setPage] = useState(1);

  const {
    data: movies,
    isLoading,
    isFetching,
    isError,
  } = useUpcomingMoviesQuery(page);
  const listData = [...new Set(movies?.results)];

  const prefetchMovie = useMoviePrefetch();

  const renderItem = useCallback(
    ({item}: {item: MovieShort | null}) => {
      if (!item) return <View className="flex flex-1" />;
      return (
        <FilmListItem
          posterPath={item.poster_path}
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
  const moviesFilled =
    remainder % 3 === 0
      ? listData
      : listData.concat(Array(3 - remainder).fill(null));

  return (
    <FlatList
      data={moviesFilled}
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
  );
};
