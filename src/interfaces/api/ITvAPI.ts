import {TvShort} from '@interfaces/models/ITv';

import {PaginatedData} from './IApi';
import {Cast, Crew, FilmImage, Video} from '../models/IFilm';

export type TrendingTvResponse = PaginatedData<TvShort>;

export type TvVideosResponse = {
  id: number;
  results: Video[];
};

export type TvImagesResponse = {
  id: number;
  backdrops: FilmImage[];
  posters: FilmImage[];
  logos: FilmImage[];
};

export type TvRecommendationsResponse = PaginatedData<TvShort>;

export type TvCreditsResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
