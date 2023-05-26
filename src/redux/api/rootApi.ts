import {SerializedError} from '@reduxjs/toolkit';
import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {env} from '@src/env';

import {MoviesApi} from './moviesApi';

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

const baseQuery = fetchBaseQuery({
  baseUrl: env.API_URL,
}) as BaseQuery;
const baseQueryWithErrorHandling: BaseQuery = async (args, api, extraOptions) =>
  await baseQuery(args, api, extraOptions);

export const RootApi = createApi({
  reducerPath,
  baseQuery: baseQueryWithErrorHandling,
  endpoints: _builder => ({}),
}).injectEndpoints(MoviesApi);
