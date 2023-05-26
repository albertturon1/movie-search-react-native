import {useCallback, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {FlatList, Text, View} from 'react-native';

import MovieListItem from '@components/Homepage/MovieListItem';
import {Movie} from '@components/interfaces/IMovieAPi';
import LoadingIndicator from '@components/LoadingIndicator';
import ScreenPadding from '@components/ScreenPadding';
import {RootStackProps} from '@navigation/INavigation';
import {useTrendingMoviesQuery} from '@redux/api/hooks/moviesApiHooks';

const keyExtractor = (item: Movie | null) =>
  item?.id.toString() ?? (Math.random() + 1).toString(36).substring(7);

const Home = () => {
  const [page, setPage] = useState(1);
  const navigation = useNavigation<RootStackProps<'Home'>['navigation']>();

  const {
    data: moviesData,
    isLoading,
    isFetching,
    isError,
  } = useTrendingMoviesQuery(page);
  const listData = [...new Set(moviesData?.results)];

  const renderItem = useCallback(
    ({item}: {item: Movie | null}) => {
      if (!item) return <View className="flex flex-1" />;
      return (
        <MovieListItem
          item={item}
          onPressFunc={() => navigation.navigate('Movie', {movie: item})}
        />
      );
    },
    [navigation],
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

export default Home;
