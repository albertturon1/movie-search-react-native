import {
  GenresResponse,
  Movie,
  MovieImagesResponse,
  MoviesResponse,
} from '@components/interfaces/IMovieAPi';

import {ApiEndpointBuilder} from './rootApi';

export const MoviesApi = {
  endpoints: (builder: ApiEndpointBuilder) => ({
    movie: builder.query<Movie, number>({
      query: (id: number) => ({
        url: `/movie/${id}`,
      }),
    }),
    movieImages: builder.query<MovieImagesResponse, number>({
      query: (id: number) => ({
        url: `/movie/${id}/images`,
      }),
    }),
    searchMovies: builder.query<MoviesResponse, string>({
      query: (name: string) => ({
        url: `/search/movie?&query=${name}&page=1`,
      }),
    }),
    trendingMovies: builder.query<MoviesResponse, number>({
      query: (pageNumber = 1) => ({
        url: `/trending/movie/week?page=${pageNumber}`,
      }),
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      serializeQueryArgs: ({endpointName}) => endpointName,
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    genres: builder.query<GenresResponse, void>({
      query: () => ({url: `/genre/movie/list`}),
    }),
  }),
};
