import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters/extend';
import colors from '../theme/colors';
import { fsize, ftype } from '../theme/fonts';
import styled from 'styled-components';

export default function MoviePopularity({voteAverage, voteCount}) {
  const starIconSource = require('../../assets/icons/star.png');
  const roundedVoteAverage = voteAverage.toFixed(2);
  const numberOfVotesCounter = voteCount > 1 ? 'votes' : 'vote';

  return (
    <Container>
      <StarIcon source={starIconSource} />
      <VoteAverageText>{roundedVoteAverage}</VoteAverageText>
      <VoteCountText>{`${voteCount}\n${numberOfVotesCounter}`}</VoteCountText>
    </Container>
  );
}

//Popularity
const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(5)}px;
`;
const VoteAverageText = styled.Text`
  font-size: ${fsize.s20}px;
  font-family: ${ftype.medium};
  color: ${colors.tertiaryBlack};
  margin-right: ${scale(10)}px;
`;
const VoteCountText = styled.Text`
  font-size: ${fsize.s11}px;
  line-height: ${fsize.s11}px;
  font-family: ${ftype.medium};
  color: ${colors.tertiaryBlack};
  margin-top: ${scale(5)}px;
`;
const StarIcon = styled.Image`
  width: ${scale(30)}px;
  height: ${scale(30)}px;
  margin-right: ${scale(10)}px;
`;
