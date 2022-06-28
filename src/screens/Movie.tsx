import React from 'react';
import { fsize, ftype } from '../theme/fonts';
import styled from 'styled-components';
import { scale, verticalScale } from 'react-native-size-matters/extend';
import { ScrollView, View } from 'react-native';
import colors from '../theme/colors';
import ScreenLayout from '../components/ScreenLayout';
import { format } from 'fecha';
import { useGenresQuery } from '../services/moviesApi';
import MoviePopularity from '../components/MoviePopularity';
import LinearGradient from 'react-native-linear-gradient';
import Genres from '../components/Movie/Genres';
import { NavigationProps } from '../../App';

const Movie: React.FC<NavigationProps<'Movie'>> = ({ route }) => {
  const { data } = route.params;
  const { data: genresData } = useGenresQuery();
  console.log(data);

  const movieGenres = genresData?.genres.filter((genre) => data.genre_ids.some((g2) => genre.id == g2)); //filtering genres that are binded to selected movie
  const formattedReleaseDate = data.release_date ? format(new Date(data.release_date), 'mediumDate') : null;
  const photoUrl = `https://image.tmdb.org/t/p/w780/${data.backdrop_path || data.poster_path}`;
  const photoAspectRatio = data.backdrop_path ? 1.77 / 1 : 1 / 1.5;

  const gradientProps = {
    locations: [0, 0.4, 1],
    colors: ['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.30)', 'rgba(0,0,0,0)'],
    height: '100%',
  };

  return (
    <>
      <CustomLinearGradient {...gradientProps} />
      <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ paddingBottom: verticalScale(60) }}>
        <MoviePhoto isBackdrop={data.backdrop_path} source={{ uri: photoUrl }} resizeMode="cover" style={{ aspectRatio: photoAspectRatio }} />
        <ScreenLayout>
          <TitleText>{data.title}</TitleText>
          <SectionLayout>
            <MoviePopularity voteCount={data.vote_count} voteAverage={data.vote_average} />
            <ReleaseAndLanguageWrapper>
              {data.release_date ? <ReleaseDateText>Release date: {formattedReleaseDate}</ReleaseDateText> : null}
              {data.original_language ? <ReleaseDateText>Original language: {data.original_language.toUpperCase()}</ReleaseDateText> : null}
            </ReleaseAndLanguageWrapper>
            {movieGenres ? <Genres genres={movieGenres} /> : null}
          </SectionLayout>
          {data.overview ? <DescriptionText>{data.overview}</DescriptionText> : null}
        </ScreenLayout>
      </ScrollView>
    </>
  );
};

export default Movie;

const MoviePhoto = styled.Image`
  width: 100%;
  margin-bottom: ${verticalScale(15)}px;
  background-color: ${({ isBackdrop }: { isBackdrop?: boolean }) => (isBackdrop ? `${colors.grey}` : `${colors.primaryWhite}`)};
`;
const CustomLinearGradient = styled(LinearGradient)`
  width: 100%;
  height: ${verticalScale(60)}px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const SectionLayout = styled.View`
  margin-bottom: ${verticalScale(12)}px;
`;

const TitleText = styled.Text`
  font-size: ${fsize.s22}px;
  line-height: ${fsize.s22 * 1.2}px;
  font-family: ${ftype.bold};
  color: ${colors.primaryBlack};
  flex-shrink: 1;
  margin-bottom: ${verticalScale(10)}px;
`;
const DescriptionText = styled.Text`
  font-size: ${fsize.s15}px;
  line-height: ${fsize.s15 * 1.5}px;
  font-family: ${ftype.regular};
  color: ${colors.secondaryBlack};
  flex-shrink: 1;
`;

//ReleaseAndLanguage
const ReleaseAndLanguageWrapper = styled.View`
  margin-top: ${verticalScale(4)}px;
  margin-bottom: ${verticalScale(5)}px;
`;

const ReleaseDateText = styled.Text`
  font-size: ${fsize.s15}px;
  font-family: ${ftype.regular};
  color: ${colors.secondaryBlack};
  margin-bottom: ${verticalScale(2)}px;
`;
