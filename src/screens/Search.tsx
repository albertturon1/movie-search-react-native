import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import colors from '../theme/colors';
import SearchBar from '../components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {fsize, ftype} from '../theme/fonts';
import {useSearchMoviesQuery} from '../services/moviesApi';
import ScreenLayout from '../components/ScreenLayout';
import MoviePopularity from '../components/MoviePopularity';
import {useNavigation} from '@react-navigation/native';
// import useDebounce from '../hooks/useDebounce';

export default function Search() {
  const [value, setValue] = useState('');
  const onChangeText = e => setValue(e);
  const queryValue = value.trim().split(' ').join('+');

  const {data: searchData, isLoading, isSuccess} = useSearchMoviesQuery(queryValue);
  // console.log('1:',searchData);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBarWrapper>
        <SearchBar value={value} onChangeText={onChangeText} autoFocus />
      </SearchBarWrapper>
      <ScrollView
        style={{flex: 1, paddingTop: verticalScale(60)}}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{paddingBottom: verticalScale(60)}}>
        <ScreenLayout>{queryValue.length > 0 && searchData ? <SearchResults searchData={searchData}/> : null}</ScreenLayout>
      </ScrollView>
    </SafeAreaView>
  );
}

const SearchResults: React.FC = ({searchData}) => {
  if (searchData.results.length === 0) return <Text style={{color: 'red'}}>Empty</Text>;
  return searchData?.results.map((result, index) => <MovieSearchItem key={index} movie={result} />);
};

const MovieSearchItem: React.FC = ({movie}) => {
  const navigation = useNavigation();
  const goToMovie = (movie: {}) => navigation.navigate('Movie', {data: movie});
  console.log(movie)

  return (
    <Pressable style={{flex: 1}} onPress={() => goToMovie(movie)}>
      <MovieSearchItemContainer>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w300/${movie.poster_path || movie.backdrop_path}`}}
          resizeMode={movie.poster_path ? 'contain' : 'cover'}
          style={{width: scale(100), aspectRatio: 1 / 1.5, marginBottom: verticalScale(15), backgroundColor: colors.grey}}
        />
        <MovieSearchItemWrapper>
          <Title>{movie.title}</Title>
          <MoviePopularity voteCount={movie.vote_count} voteAverage={movie.vote_average} />
        </MovieSearchItemWrapper>
      </MovieSearchItemContainer>
    </Pressable>
  );
};

const SearchBarWrapper = styled.View`
  width: 100%;
  padding: 0 ${scale(15)}px;
  position: absolute;
  padding-top: ${verticalScale(0)}px;
  z-index: 10;
  background-color: ${colors.primaryWhite};
`;

const MovieSearchItemContainer = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: ${verticalScale(15)}px;
`;
const MovieSearchItemWrapper = styled.View`
  flex: 1;
  padding: ${verticalScale(15)}px ${scale(15)}px;
`;

const Title = styled.Text`
  font-family: ${ftype.bold};
  color: ${colors.primaryBlack};
  font-size: ${fsize.s22}px;
  line-height: ${fsize.s22 * 1.2}px;
  flex-shrink: 1;
  margin-bottom: ${verticalScale(5)}px;
`;
const DetailText = styled.Text`
  font-family: ${ftype.regular};
  color: ${colors.tertiaryBlack};
  font-size: ${fsize.s13}px;
  line-height: ${fsize.s13 * 1.2}px;
  margin-bottom: ${verticalScale(2)}px;
`;
const DescriptionText = styled(DetailText)`
  line-height: ${fsize.s14 * 1.4}px;
`;
