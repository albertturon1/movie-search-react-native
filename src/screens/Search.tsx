import { Image, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Movie, Movies, useSearchMoviesQuery } from '../services/moviesApi';
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
      {/* <ScrollView
        style={{ flex: 1, paddingTop: verticalScale(60) }}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ paddingBottom: verticalScale(60) }}
      >
      </ScrollView> */}
    </SafeAreaView>
  );
};
export default Search;

const SearchResults = (props: Movies) => {
  // if (props.results.length === 0) return <EmptyListText>We couldn&apos;t find anything for you</EmptyListText>;
  return (
    <>
      {/* {props?.results.map((result: Movie, index: number) => (
        <MovieSearchItem key={index} {...result} />
      ))} */}
    </>
  );
};

// const MovieSearchItem = (props: Movie) => {
//   const navigation = useNavigation();
//   const goToMovie = (props: Movie) => navigation.navigate('Movie' as never, { data: props } as never);

//   return (
//     <Pressable style={{ flex: 1 }} onPress={() => goToMovie(props)}>
//       <MovieSearchItemContainer>
//         <Image
//           source={{ uri: `https://image.tmdb.org/t/p/w300/${props.poster_path || props.backdrop_path}` }}
//           resizeMode={props.poster_path ? 'contain' : 'cover'}
//           style={{ width: scale(90), aspectRatio: 1 / 1.5, marginBottom: verticalScale(15), backgroundColor: colors.grey }}
//         />
//         <MovieSearchItemWrapper>
//           <Title>{props.title}</Title>
//           <MoviePopularity voteCount={props.vote_count} voteAverage={props.vote_average} />
//         </MovieSearchItemWrapper>
//       </MovieSearchItemContainer>
//     </Pressable>
//   );
// };
