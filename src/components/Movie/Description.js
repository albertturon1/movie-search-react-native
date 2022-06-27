import React from 'react';
import { fsize, ftype } from '../../theme/fonts';
import styled from 'styled-components';
import { scale, verticalScale } from 'react-native-size-matters/extend';
import { FlatList, Image, Pressable, ScrollView, Text } from 'react-native';
import colors from '../../theme/colors';


const Description = ({ description, creatorThumbnail }) => {
  return (
    <Container>
      <AuthorThumbnail source={{ uri: creatorThumbnail }} />
      <CommentText>{description}</CommentText>
    </Container>
  );
};
export default Description;

const Container = styled.View`
  width: 100%;
  padding: ${verticalScale(3)}px 0;
  flex-direction: row;
  /* align-items: center; */
`

const AuthorThumbnailSize = scale(25);
const AuthorThumbnail = styled.Image`
  width: ${AuthorThumbnailSize}px;
  height: ${AuthorThumbnailSize}px;
  border-radius: 50px;
  margin-right: ${scale(10)}px;
  margin-top: ${verticalScale(3)}px;
`;

const CommentText = styled.Text`
  font-size: ${fsize.s14}px;
  line-height: ${fsize.s14*1.4}px;
  font-family: ${ftype.regular};
  color: ${colors.secondaryBlack};
  flex-shrink: 1;
`;