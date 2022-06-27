import React, {ReactElement} from 'react';
import {fsize, ftype} from '../../theme/fonts';
import styled from 'styled-components/native'
import {scale, verticalScale} from 'react-native-size-matters/extend';
import colors from '../../theme/colors';
import { Genres as GenresInterface } from '../../services/moviesApi';


const Genres: React.FC<GenresInterface> = ({genres}): ReactElement => {
  console.log(genres)
  return (
    <Container>
      {genres.map((genre, index) => {
        return (
          <GenreBox key={index}>
            <GenreText>{genre.name}</GenreText>
          </GenreBox>
        );
      })}
    </Container>
  );
};

export default Genres;

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const GenreBox = styled.View`
  padding: ${verticalScale(6)}px ${scale(15)}px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${colors.tertiaryBlack};
  border-radius: 15px;
  margin-right: ${scale(7)}px;
  margin-bottom: ${verticalScale(10)}px;
  background-color: wheat;
`;
const GenreText = styled.Text`
  font-size: ${fsize.s14}px;
  font-family: ${ftype.medium};
  color: ${colors.tertiaryBlack};
`;
