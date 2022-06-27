import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_KEY = '8691ee76804d7a69c4236d34fea042b3'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3/'}),
  endpoints: builder => ({
    searchMovies: builder.query({
      query: (name: string) => `/search/movie?api_key=${API_KEY}&query=${name}&page=1`,
    }),
    trendingMovies: builder.query({
      query: () => `/trending/movie/week?api_key=${API_KEY}`,
    }),
    genres: builder.query({
      query: () => `/genre/movie/list?api_key=${API_KEY}`,
    }),
  }),
});

export const {useSearchMoviesQuery, useTrendingMoviesQuery, useGenresQuery} = moviesApi;
