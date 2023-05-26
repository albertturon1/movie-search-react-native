import {useNavigation} from '@react-navigation/native';
import {FlatList, Text, View} from 'react-native';

import {Movie} from '@components/interfaces/IMovieAPi';
import ScreenPadding from '@components/ScreenPadding';
import {useTrendingMoviesQuery} from '@redux/api/hooks/moviesApiHooks';

import MovieListItem from '../../components/Homepage/MovieListItem';
import LoadingIndicator from '../../components/LoadingIndicator';
import {RootStackProps} from '../../navigation/INavigation';

const keyExtractor = (item: Movie | null) =>
  item?.id.toString() ?? Math.random().toString();

const Home = () => {
  const navigation = useNavigation<RootStackProps<'Home'>['navigation']>();

  const {data: moviesData, isLoading, isError} = useTrendingMoviesQuery();
  const listData = moviesData?.results;

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

  const renderItem = ({item}: {item: Movie | null}) => {
    if (!item) return <View className="flex flex-1" />;
    return (
      <MovieListItem
        item={item}
        onPressFunc={() => navigation.navigate('Movie', {movie: item})}
      />
    );
  };

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
        onEndReachedThreshold={2}
        numColumns={3}
        keyExtractor={keyExtractor}
      />
    </ScreenPadding>
  );
};

export default Home;
