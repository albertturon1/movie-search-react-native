import React from 'react';
import {fsize, ftype} from '../theme/fonts';
import styled from 'styled-components';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {FlatList, Image, Pressable, ScrollView, Text} from 'react-native';
import colors from '../theme/colors';
import getUserPhotoLike from '../hooks/getUserPhotoLike';
import getPhotoComments from '../hooks/getPhotoComments';
import postUserPhotoLike from '../hooks/postUserPhotoLike';
import deleteUserPhotoLike from '../hooks/deleteUserPhotoLike';
import {AuthContext} from '../../App';
import PhotoComments from '../components/HomepagePhoto/PhotoComments';
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

const HomepagePhoto: React.FC<Props> = ({route}) => {
  const {currentUser} = React.useContext(AuthContext);
  const navigation = useNavigation();
  const {data} = route.params;
  const {user: photographer} = data;

  const {data: isLiked, isLoading} = getUserPhotoLike(currentUser.id, data.id);
  const {data: photoComments, isLoading: isPhotoCommentsLoading} = getPhotoComments(data.id);
  const {mutate: likePhoto} = postUserPhotoLike();
  const {mutate: unlikePhoto} = deleteUserPhotoLike();
  const numberOfLikesString = numberOfLikesConverter(data.likes, isLiked?.is_liked);

  const openProfile = () => navigation.push('UserProfile', {userID: photographer.id});

  const onHeartPress = () => {
    if (isLiked?.is_liked) return unlikePhoto({userAccountID: currentUser.id, photoID: data.id});
    else if (isLiked?.is_liked === false) return likePhoto({userAccountID: currentUser.id, photoID: data.id});
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps={'handled'}>
      <Pressable style={{flex: 1}}>
        <AuthorPreviewWrapper>
          <AuthorThumbnail source={{uri: photographer.profile_image.medium}} />
          <AuthorText>{photographer.first_name}</AuthorText>
        </AuthorPreviewWrapper>
      </Pressable>
      <Image source={{uri: data.urls.regular}} resizeMode="cover" style={{width: '100%', aspectRatio: 1 / 1, marginBottom: verticalScale(10)}} />
      <Container>
        <SocialActionsWrapper>
          <HeartIcon like={isLiked?.is_liked || false} onPress={onHeartPress} />
          <NumberOfLikes>{numberOfLikesString}</NumberOfLikes>
        </SocialActionsWrapper>
        {data.description ? <Description description={data.description} creatorThumbnail={photographer.profile_image.medium} /> : null}
        <PhotoComments photoID={data.id} comments={photoComments} />
      </Container>
    </ScrollView>
  );
};

export default HomepagePhoto;

const HeartIcon: React.FC<{like: boolean}> = ({like, onPress}) => {
  const heartIcon = like ? require('../assets/icons/heartActive.png') : require('../assets/icons/heart.png');
  return (
    <Pressable style={{flex: 1}} onPress={onPress}>
      <SocialActionIcon source={heartIcon} resizeMode="contain" />
    </Pressable>
  );
};

const numberOfLikesConverter = (likes, isLiked) => {
  if (likes === 1) {
    if (!isLiked) return `${likes} osoba lubi to zdjęcie`;
    else return `Ty i ${likes} osoba lubicie to zdjęcie`;
  } else if (likes >= 2 && likes < 5) {
    if (!isLiked) return `${likes} osoby lubi to zdjęcie`;
    else return `Ty i ${likes} osoby lubicie to zdjęcie`;
  } else if (likes >= 5) {
    if (!isLiked) return `${likes} osób lubi to zdjęcie`;
    else return `Ty i ${likes} osób lubicie to zdjęcie`;
  }
  return 'Bądź pierwszą osobą, która polubi to zdjęcie';
};

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
