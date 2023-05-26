import {GenresResponse, MoviesResponse} from '@components/interfaces/IMovieAPi';

import {ApiEndpointBuilder} from './rootApi';

export const MoviesApi = {
  endpoints: (builder: ApiEndpointBuilder) => ({
    searchMovies: builder.query<MoviesResponse, string>({
      query: (name: string) => ({
        url: `/search/movie?&query=${name}&page=1`,
      }),
    }),
    trendingMovies: builder.query<MoviesResponse, void>({
      query: () => ({url: `/trending/movie/week`}),
    }),
    genres: builder.query<GenresResponse, void>({
      query: () => ({url: `/genre/movie/list`}),
    }),
  }),
};
