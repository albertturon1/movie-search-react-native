import {PaginatedData} from '@interfaces/api/IApi';
import {Cast, Crew, FilmImage, Video} from '@interfaces/models/IFilm';
import {MovieShort} from '@interfaces/models/IMovie';

export type MoviesResponse = PaginatedData<MovieShort>;

export type MovieImagesResponse = {
  id: number;
  backdrops: FilmImage[];
  posters: FilmImage[];
  logos: FilmImage[];
};

export type MovieVideosResponse = {
  id: number;
  results: Video[];
};

export type MovieCreditsResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export type MovieRecommendationsResponse = PaginatedData<MovieShort>;
export type UpcomingMoviesResponse = PaginatedData<MovieShort> & {
  dates: {
    maximum: string;
    minimum: string;
  };
};
