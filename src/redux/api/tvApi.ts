import {
  TvImagesResponse,
  TvVideosResponse,
  TrendingTvResponse,
  TvCreditsResponse,
  TvRecommendationsResponse,
} from '@interfaces/api/ITvAPI';
import {Tv} from '@interfaces/models/ITv';

import {ApiEndpointBuilder} from './rootApi';

export const TvApi = {
  endpoints: (builder: ApiEndpointBuilder) => ({
    tv: builder.query<Tv, number>({
      query: (id: number) => ({
        url: `/tv/${id}`,
      }),
    }),
    tvImages: builder.query<TvImagesResponse, number>({
      query: (id: number) => ({
        url: `/tv/${id}/images`,
      }),
    }),
    tvVideos: builder.query<TvVideosResponse, number>({
      query: (id: number) => ({
        url: `/tv/${id}/videos`,
      }),
    }),
    tvCredits: builder.query<TvCreditsResponse, number>({
      query: (id: number) => ({
        url: `/tv/${id}/credits`,
      }),
    }),
    trendingTv: builder.query<TrendingTvResponse, number>({
      query: (pageNumber = 1) => ({
        url: `/trending/tv/week?page=${pageNumber}`,
      }),
      merge: (currentCache, newItems) => {
        currentCache.page = newItems.page;
        currentCache.results.push(...newItems.results);
      },
      serializeQueryArgs: ({endpointName}) => endpointName,
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    tvRecommendations: builder.query<TvRecommendationsResponse, number>({
      query: (id: number) => ({
        url: `/tv/${id}/recommendations`,
      }),
      merge: (currentCache, newItems) => {
        currentCache.page = newItems.page;
        currentCache.results.push(...newItems.results);
      },
      serializeQueryArgs: ({endpointName}) => endpointName,
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
  }),
};
