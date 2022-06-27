import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, Text, useWindowDimensions, View} from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';
import ScreenLayout from '../components/ScreenLayout';
import {verticalScale} from 'react-native-size-matters/extend';
import {useTrendingMoviesQuery} from '../services/moviesApi';
import MovieListItem from '../components/MovieListItem';

export default function Homepage() {
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  const {data, isLoading, isError, isSuccess} = useTrendingMoviesQuery();
  const Props = {
    data,
    refreshing,
    onRefresh,
  };
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <Text style={{color: 'red'}}>error</Text>;
  }

  return (
    <ScreenLayout>
      <VerticalFlatlist {...Props} />
    </ScreenLayout>
  );
}

interface VerticalFlatlistProps {
  data: {
    pageParams: [];
    pages: [];
  };
  refreshing: boolean;
  onRefresh: () => void;
}

export interface UnsplashItem {
  id: string;
  name: string;
}

const VerticalFlatlist: React.FC<VerticalFlatlistProps> = ({data, refreshing, onRefresh}) => {
  const navigation = useNavigation();
  const listData = data.results;

  const goMovie = item => {
    navigation.navigate('Movie', {data: item});
  };

  const renderItem = ({item}) => {
    return <MovieListItem item={item} onPressFunc={() => goMovie(item)} />;
  };

  const flatListOptimizationProps = {
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 25,
    keyExtractor: useCallback((item, index) => index.toString(), []),
  };
  // const loadMoreMeetings = () => {
  //   if (!hasNextPage) return null;
  //   return fetchNextPage();
  // };

  return (
    <FlatList
      data={listData}
      bounces={false}
      renderItem={renderItem}
      // onEndReached={loadMoreMeetings}
      ListHeaderComponent={<View style={{height: verticalScale(15)}} />}
      {...flatListOptimizationProps}
      onEndReachedThreshold={2}
      // ListFooterComponent={hasNextPage ? <ActivityIndicator size="large" color="#00ff00" /> : null}
      numColumns={3}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};
