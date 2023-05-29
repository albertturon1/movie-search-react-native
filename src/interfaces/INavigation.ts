import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {MovieShort} from './models/IMovie';
import {TvShort} from './models/ITv';

export type RootStackProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootStackParamList = {
  AppBottomTab: NavigatorScreenParams<AppBottomTabParamList>;
  Movie: {movie: MovieShort};
  Tv: {tv: TvShort};
};

export type HomeStackParamList = {
  Home: undefined;
  MoviesTrending: undefined;
  TvTrending: undefined;
};

export type HomeStackProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    AppBottomTabProps<keyof AppBottomTabParamList>
  >;

export type SearchStackParamList = {
  Search: undefined;
};

export type SearchStackProps<T extends keyof SearchStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SearchStackParamList, T>,
    AppBottomTabProps<keyof AppBottomTabParamList>
  >;

export type AppBottomTabParamList = {
  HomeStackNavigator: NavigatorScreenParams<HomeStackParamList>;
  SearchStackNavigator: NavigatorScreenParams<SearchStackParamList>;
};

export type AppBottomTabProps<T extends keyof AppBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<AppBottomTabParamList, T>,
    RootStackProps<'AppBottomTab'>
  >;
