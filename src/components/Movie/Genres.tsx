import {Genre} from '@components/interfaces/IMovieAPi';
import {View, Text} from 'react-native';

const Genres = ({genres}: {genres: Genre[]}) => (
  <View
    className="flex flex-row flex-wrap items-center"
    style={{columnGap: 8, rowGap: 12}}>
    {genres.map(genre => {
      return (
        <View
          key={genre.id}
          className="py-1.5 bg-yellow-300 border rounded-3xl flex items-center justify-center px-4">
          <Text className="font-medium text-tertiaryBlack">{genre.name}</Text>
        </View>
      );
    })}
  </View>
);

export default Genres;
