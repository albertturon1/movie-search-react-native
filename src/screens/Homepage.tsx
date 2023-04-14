import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, Text } from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';
import { Movie, Movies, useTrendingMoviesQuery } from '../services/moviesApi';
import MovieListItem from '../components/Homepage/MovieListItem';
import styled from 'styled-components';
import { RootStackProps } from '../navigation/INavigation';

const Homepage = () => {
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

const VerticalFlatlist = ({ moviesData }: { moviesData: Movies | undefined }) => {
  const navigation = useNavigation<RootStackProps<'Home'>['navigation']>();
  const listData = moviesData?.results;

  const goMovie = (item: Movie): void => {
    navigation.navigate('Movie', { data: item });
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
