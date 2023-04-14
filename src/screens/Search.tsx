import { Image, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters/extend';
import { fsize, ftype } from '../theme/fonts';
import { Movie, Movies, useSearchMoviesQuery } from '../services/moviesApi';
import ScreenLayout from '../components/ScreenLayout';
import MoviePopularity from '../components/MoviePopularity';
import { useNavigation } from '@react-navigation/native';
import HeaderBar from '../components/SearchScreen/HeaderBar';
import { RootStackProps } from '../navigation/INavigation';

const Search = ({ navigation, route }: RootStackProps<'Search'>) => {
  const [value, setValue] = useState('');
  const onChangeText = (value: string): void => setValue(value);
  const queryValue = value.trim().split(' ').join('+');

  const { data: searchData } = useSearchMoviesQuery(queryValue);

  React.useLayoutEffect(() => {
    navigation.setOptions({ header: () => <HeaderBar onChangeText={onChangeText} value={queryValue} autoFocus placeholder="Search a movie" /> });
  }, [navigation, route, value]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, paddingTop: verticalScale(60) }}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ paddingBottom: verticalScale(60) }}
      >
        <ScreenLayout>{queryValue.length > 0 && searchData ? <SearchResults {...searchData} /> : null}</ScreenLayout>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Search;

const SearchResults = (props: Movies) => {
  if (props.results.length === 0) return <EmptyListText>We couldn&apos;t find anything for you</EmptyListText>;
  return (
    <>
      {props?.results.map((result: Movie, index: number) => (
        <MovieSearchItem key={index} {...result} />
      ))}
    </>
  );
};

const MovieSearchItem = (props: Movie) => {
  const navigation = useNavigation();
  const goToMovie = (props: Movie) => navigation.navigate('Movie' as never, { data: props } as never);

  return (
    <Pressable style={{ flex: 1 }} onPress={() => goToMovie(props)}>
      <MovieSearchItemContainer>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w300/${props.poster_path || props.backdrop_path}` }}
          resizeMode={props.poster_path ? 'contain' : 'cover'}
          style={{ width: scale(90), aspectRatio: 1 / 1.5, marginBottom: verticalScale(15), backgroundColor: colors.grey }}
        />
        <MovieSearchItemWrapper>
          <Title>{props.title}</Title>
          <MoviePopularity voteCount={props.vote_count} voteAverage={props.vote_average} />
        </MovieSearchItemWrapper>
      </MovieSearchItemContainer>
    </Pressable>
  );
};

const MovieSearchItemContainer = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: ${verticalScale(15)}px;
`;
const MovieSearchItemWrapper = styled.View`
  flex: 1;
  padding: ${verticalScale(0)}px ${scale(15)}px;
`;
const Title = styled.Text`
  font-family: ${ftype.bold};
  color: ${colors.primaryBlack};
  font-size: ${fsize.s22}px;
  line-height: ${fsize.s22 * 1.2}px;
  flex-shrink: 1;
  margin-bottom: ${verticalScale(5)}px;
`;

//EmptyList
const EmptyListText = styled.Text`
  font-family: ${ftype.regular};
  color: ${colors.primaryBlack};
  font-size: ${fsize.s15}px;
`;
