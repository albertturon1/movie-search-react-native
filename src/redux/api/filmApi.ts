import {GenresResponse} from '@interfaces/models/IFilm';

import {ApiEndpointBuilder} from './rootApi';

export const FilmApi = {
  endpoints: (builder: ApiEndpointBuilder) => ({
    genres: builder.query<GenresResponse, void>({
      query: () => ({url: `/genre/movie/list`}),
    }),
  }),
};
