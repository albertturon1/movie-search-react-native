import {Movie} from '@components/interfaces/IMovieAPi';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Movie: {movie: Movie};
};
