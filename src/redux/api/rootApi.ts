import {SerializedError} from '@reduxjs/toolkit';
import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {env} from '@src/env';

import {FilmApi} from './filmApi';
import {MovieApi} from './movieApi';
import {TvApi} from './tvApi';

export type TagType = (typeof tagTypes)[number];
export type ReducerPath = typeof reducerPath;
export type BaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  SerializedError,
  unknown
>;
export type ApiEndpointBuilder = EndpointBuilder<
  BaseQuery,
  TagType,
  ReducerPath
>;

const reducerPath = 'RootApi' as const;
const tagTypes = [] as const;

const HEADER_APP_JSON = 'application/json';

const baseQuery = fetchBaseQuery({
  baseUrl: env.API_URL,
  prepareHeaders: headers => {
    headers.set('Authorization', `Bearer ${env.API_KEY}`);
    headers.set('Accept-Language', HEADER_APP_JSON);
    headers.set('Content-Type', HEADER_APP_JSON);
    headers.set('Accept', HEADER_APP_JSON);
  },
}) as BaseQuery;
const baseQueryWithErrorHandling: BaseQuery = async (args, api, extraOptions) =>
  await baseQuery(args, api, extraOptions);

export const RootApi = createApi({
  reducerPath,
  baseQuery: baseQueryWithErrorHandling,
  keepUnusedDataFor: 180,
  endpoints: _builder => ({}),
})
  .injectEndpoints(MovieApi)
  .injectEndpoints(TvApi)
  .injectEndpoints(FilmApi);

export const usePrefetch = RootApi.usePrefetch.bind(RootApi);
