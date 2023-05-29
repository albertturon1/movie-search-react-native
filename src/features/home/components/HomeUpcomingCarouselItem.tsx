import {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {
  Pressable,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';

import LoadingIndicator from '@components/LoadingIndicator';
import {FilmPoster} from '@components/misc/FilmPoster';
import {YOUTUBE_ASPECT_RATIO} from '@constants/Globals';
import {useFilmTrailerSource} from '@hooks/useFilmTrailerSource';
import {RootStackProps} from '@interfaces/INavigation';
import {MovieShort} from '@interfaces/models/IMovie';
import {useMovieVideosQuery} from '@redux/api/hooks/moviesApiHooks';
import {useMoviePrefetch} from '@src/features/movie/hooks/useMoviePrefetch';
import {getTMDBImagePath} from '@src/lib/utils';
import Theme from '@src/Theme';

export const HomeUpcomingCarousellItem = ({
  item,
  ...props
}: {
  item: MovieShort;
  onReady: (readyItemID: number) => void;
  posterHeight: number;
}) => {
  const navigation = useNavigation<RootStackProps<'Movie'>['navigation']>();
  const {width} = useWindowDimensions();
  const [trailerReady, setTrailerReady] = useState(false);

  const prefetchMovie = useMoviePrefetch();
  const {data: videos} = useMovieVideosQuery(item.id);
  const trailerVideo = useFilmTrailerSource(videos?.results);

  return (
    <Pressable
      onPress={() => {
        prefetchMovie(item.id);
        navigation.push('Movie', {
          movie: item,
        });
      }}>
      <View className="flex flex-col w-full relative h-full">
        <View className="absolute left-0 bottom-0 flex flex-row w-full gap-x-3 items-end z-10 pl-4">
          <View
            style={{
              height: props.posterHeight,
            }}>
            <FilmPoster path={item.poster_path} />
          </View>
          <View className="flex flex-1 flex-col gap-y-0.5">
            <Text className="font-bold" numberOfLines={1}>
              {item.title}
            </Text>
            <Text numberOfLines={1}>{item.overview}</Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate('Movie', {
                movie: item,
              });
            }}
            className="px-2 h-10 pt-1 -mr-2">
            <Ionicons
              name="chevron-forward"
              size={28}
              color={Theme.colors.blue[500]}
            />
          </Pressable>
        </View>
        <View
          style={[
            styles.backdrop,
            {
              height: width * YOUTUBE_ASPECT_RATIO,
              backgroundColor: Theme.colors.muted,
            },
          ]}>
          {/* showing backdrop when trailer is loading */}
          {!trailerReady && (
            <View className="w-full h-full absolute top-0 z-10">
              <ImageBackground
                className="w-full h-full"
                source={{
                  uri: getTMDBImagePath({
                    path: item.backdrop_path,
                    size: 'w300',
                  }),
                }}>
                <View className="w-full h-full flex justify-center items-center bg-black/50">
                  <LoadingIndicator />
                </View>
              </ImageBackground>
            </View>
          )}
          {trailerVideo && (
            <YoutubePlayer
              height={width * YOUTUBE_ASPECT_RATIO}
              videoId={trailerVideo.key}
              onReady={() => {
                setTrailerReady(true);
                props.onReady(item.id);
              }}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    relative: true,
    width: '100%',
    backgroundColor: Theme.colors.muted,
  },
});
