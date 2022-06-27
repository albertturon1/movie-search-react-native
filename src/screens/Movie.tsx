import React from 'react';
import {fsize, ftype} from '../theme/fonts';
import styled from 'styled-components';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {FlatList, Image, Pressable, ScrollView, Text} from 'react-native';
import colors from '../theme/colors';
import Description from '../components/HomepagePhoto/Description';
import {useNavigation} from '@react-navigation/native';

interface Props {
  route: {
    key: string;
    name: string;
    params: {
      data: {
        alt_description: string | null;
        blur_hash: string;
        categories: [];
        color: string;
        created_at: string;
        current_user_collections: [];
        description: string | null;
        height: number;
        id: string;
        liked_by_user: boolean;
        likes: number;
        links: [{}];
        promoted_at: boolean | null;
        sponsorship: [{}];
        topic_submissions: [{}];
        updated_at: boolean
        urls: [{}];
        user: [{}];
        width: number;
      };
    };
    path: undefined;
  };
}

const Movie: React.FC<Props> = ({route}) => {

  const navigation = useNavigation();
  const {data} = route.params;
  const {user: photographer} = data;

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={'handled'}>
      {/* <Pressable style={{flex: 1}}>
        <AuthorPreviewWrapper>
          <AuthorThumbnail source={{uri: photographer.profile_image.medium}} />
          <AuthorText>{photographer.first_name}</AuthorText>
        </AuthorPreviewWrapper>
      </Pressable>
      <Image source={{uri: data.urls.regular}} resizeMode="cover" style={{width: '100%', aspectRatio: 1 / 1, marginBottom: verticalScale(10)}} />
      <Container>
        {data.description ? <Description description={data.description} creatorThumbnail={photographer.profile_image.medium} /> : null}
      </Container> */}
    </ScrollView>
  );
};

export default Movie;


const Container = styled.View`
  height: 100%;
  width: 100%;
  padding: 0 ${scale(15)}px 0 ${scale(10)}px;
`;

const ImageTitle = styled.Text`
  font-size: ${fsize.s23}px;
  font-family: ${ftype.bold};
  color: ${colors.primaryBlack};
`;
const AuthorText = styled.Text`
  font-size: ${fsize.s17}px;
  font-family: ${ftype.semibold};
  color: ${colors.secondaryBlack};
`;
const RegularText = styled.Text`
  font-size: ${fsize.s15}px;
  font-family: ${ftype.regular};
  color: ${colors.secondaryBlack};
  text-align: justify;
`;

const SocialActionsWrapper = styled.View`
  width: 100%;
  margin-bottom: ${verticalScale(10)}px;
`;
const AuthorPreviewWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: ${verticalScale(10)}px;
  padding: 0 ${scale(15)}px 0 ${scale(10)}px;
`;

const AuthorThumbnailSize = scale(35);

const AuthorThumbnail = styled.Image`
  width: ${AuthorThumbnailSize}px;
  height: ${AuthorThumbnailSize}px;
  border-radius: 50px;
  margin-right: ${scale(10)}px;
`;

//SocialActions
const SocialActionIconWidth = scale(23);
const SocialActionIconHeight = scale(27);
const SocialActionIcon = styled.Image`
  width: ${SocialActionIconWidth}px;
  height: ${SocialActionIconHeight}px;
  margin-right: ${scale(8)}px;
`;

const NumberOfLikes = styled.Text`
  font-size: ${fsize.s14}px;
  font-family: ${ftype.medium};
  color: ${colors.secondaryBlack};
  margin-top: ${verticalScale(5)}px;
`;
