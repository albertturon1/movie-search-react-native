import {useNavigation} from '@react-navigation/native';
import {DateTime} from 'luxon';
import {View, Pressable} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Movie, MovieShort} from '@components/interfaces/IMovieAPi';
import {formatRuntime} from '@src/lib/utils';
import Theme from '@src/Theme';

export const MovieHeader = ({
  movieInitialData,
  movie,
}: {
  movieInitialData: MovieShort;
  movie: Movie | undefined;
}) => {
  const navigation = useNavigation();

  return (
    <View className="relative flex flex-col gap-y-1.5 px-10 overflow-hidden">
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        className="absolute -top-3 -left-4 p-4 z-50">
        <MaterialCommunityIcons
          name="arrow-left"
          color={Theme.colors.black}
          size={25}
        />
      </Pressable>
      <Text className="text-[27px] text-black leading-[34px] text-center font-medium">
        {movieInitialData.title}
      </Text>
      <View className="flex flex-row gap-x-3 justify-center items-center">
        <Text>
          {DateTime.fromISO(movieInitialData.release_date).toFormat('yyyy')}
        </Text>
        {movie && <Text>{formatRuntime(movie.runtime)}</Text>}
        {movieInitialData.adult && <Text>{'For adults'}</Text>}
      </View>
    </View>
  );
};
