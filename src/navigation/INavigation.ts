import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Movie } from '../services/moviesApi';

export type RootStackProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Movie: { data: Movie };
};
