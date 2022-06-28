import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = '8691ee76804d7a69c4236d34fea042b3';

interface genre {
  id: number;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genres {
  genres: genre[];
}

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    searchMovies: builder.query<Movies, string>({
      query: (name: string) => `/search/movie?api_key=${API_KEY}&query=${name}&page=1`,
    }),
    trendingMovies: builder.query<Movies, void>({
      query: () => `/trending/movie/week?api_key=${API_KEY}`,
    }),
    genres: builder.query<Genres, void>({
      query: () => `/genre/movie/list?api_key=${API_KEY}`,
    }),
  }),
});

export const { useSearchMoviesQuery, useTrendingMoviesQuery, useGenresQuery } = moviesApi;
