import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {GenresResponse, MoviesResponse} from '@components/interfaces/IMovieAPi';
import {env} from '@src/env';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({baseUrl: env.API_URL}),
  endpoints: builder => ({
    searchMovies: builder.query<MoviesResponse, string>({
      query: (name: string) => ({
        url: `/search/movie?api_key=${env.API_KEY}&query=${name}&page=1`,
      }),
    }),
    trendingMovies: builder.query<MoviesResponse, void>({
      query: () => ({url: `/trending/movie/week?api_key=${env.API_KEY}`}),
    }),
    genres: builder.query<GenresResponse, void>({
      query: () => ({url: `/genre/movie/list?api_key=${env.API_KEY}`}),
    }),
  }),
});

export const {useSearchMoviesQuery, useTrendingMoviesQuery, useGenresQuery} =
  moviesApi;
