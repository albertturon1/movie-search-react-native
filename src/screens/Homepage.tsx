import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Text } from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';
import { scale } from 'react-native-size-matters/extend';
import { Movie, Movies, useTrendingMoviesQuery } from '../services/moviesApi';
import MovieListItem from '../components/Homepage/MovieListItem';
import styled from 'styled-components';
import { NavigationProps } from '../../App';

const Homepage: React.FC<NavigationProps<'Homepage'>> = () => {
  const { data: moviesData, isLoading, isError } = useTrendingMoviesQuery();

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <Text style={{ color: 'red' }}>error</Text>;
  }

  return <VerticalFlatlist moviesData={moviesData} />;
};

export default Homepage;

interface VerticalFlatlistProps {
  moviesData: Movies | undefined;
}

const VerticalFlatlist: React.FC<VerticalFlatlistProps> = ({ moviesData }) => {
  const navigation = useNavigation();
  const listData = moviesData?.results;

  const goMovie = (item: Movie): void => {
    navigation.navigate('Movie' as never, { data: item } as never);
  };

  const renderItem = ({ item }: { item: Movie }) => {
    return <MovieListItem item={item} onPressFunc={() => goMovie(item)} />;
  };

  const flatListOptimizationProps = {
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 25,
    keyExtractor: useCallback((item, index) => index.toString(), []),
  };

  return (
    <Container>
      <FlatList
        data={listData}
        bounces={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        {...flatListOptimizationProps}
        onEndReachedThreshold={2}
        numColumns={3}
      />
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 0 ${scale(5)}px;
`;
