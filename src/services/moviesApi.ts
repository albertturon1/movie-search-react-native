import {GenresResponse, MoviesResponse} from '@components/interfaces/IMovieAPi';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({baseUrl: Config.API_URL}),
  endpoints: builder => ({
    searchMovies: builder.query<MoviesResponse, string>({
      query: (name: string) => ({
        url: `/search/movie?api_key=${Config.API_KEY}&query=${name}&page=1`,
      }),
    }),
    trendingMovies: builder.query<MoviesResponse, void>({
      query: () => ({url: `/trending/movie/week?api_key=${Config.API_KEY}`}),
    }),
    genres: builder.query<GenresResponse, void>({
      query: () => ({url: `/genre/movie/list?api_key=${Config.API_KEY}`}),
    }),
  }),
});

export const {useSearchMoviesQuery, useTrendingMoviesQuery, useGenresQuery} =
  moviesApi;
