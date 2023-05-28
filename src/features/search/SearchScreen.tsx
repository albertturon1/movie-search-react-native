import React, {useState} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';

// import {Movie} from '@components/interfaces/IMovieApi';
// import { useSearchMoviesQuery } from '@redux/api/hooks/moviesApiHooks';
import {SearchStackProps} from '@interfaces/INavigation';
import Theme from '@src/Theme';

import HeaderBar from './components/HeaderBar';

export const SearchScreen = ({
  navigation,
  route,
}: SearchStackProps<'Search'>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState('');
  // const onChangeText = (value: string): void => setValue(value);
  const queryValue = value.trim().split(' ').join('+');

  // const { data: searchData } = useSearchMoviesQuery(queryValue);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <HeaderBar
        // onChangeText={onChangeText}
        // value={queryValue}
        // autoFocus
        // placeholder="Search a movie"
        />
      ),
    });
  }, [navigation, queryValue, route, value]);

  return (
    <SafeAreaView style={Theme.styles.flexOne}>
      {/* <ScrollView
        style={{ flex: 1, paddingTop: verticalScale(60) }}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ paddingBottom: verticalScale(60) }}
      >
      </ScrollView> */}
    </SafeAreaView>
  );
};

// const SearchResults = (props: Movie) =>
//   // if (props.results.length === 0) return <EmptyListText>We couldn&apos;t find anything for you</EmptyListText>;
//    (
//     <>
//       {/* {props?.results.map((result: Movie, index: number) => (
//         <MovieSearchItem key={index} {...result} />
//       ))} */}
//     </>
//   )
// ;

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
