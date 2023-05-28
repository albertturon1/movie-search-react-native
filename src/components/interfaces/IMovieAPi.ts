import {PaginatedData} from '@interfaces/IApi';

export type Genre = {
  id: number;
  name: string;
};

export type MovieStatus = 'released';

export type Collection = {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieShort = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
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
};

export type Movie = {
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: MovieStatus;
  tagline: string;
} & Omit<MovieShort, 'genre_ids' | 'media_type'>;

export type MoviesResponse = PaginatedData<MovieShort>;

export interface GenresResponse {
  genres: Genre[];
}

export type MovieImage = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type MovieImagesResponse = {
  id: number;
  backdrops: MovieImage[];
  posters: MovieImage[];
  logos: MovieImage[];
};

type BackdropSizes = 'w300' | 'w780' | 'w1280' | 'original';
type LogoSizes = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
type PosterSizes =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'original';
type ProfileSizes = 'w45' | 'w185' | 'h632' | 'original';
type StillSizes = 'w92' | 'w185' | 'w300' | 'original';

export type ImageSize =
  | BackdropSizes
  | LogoSizes
  | PosterSizes
  | ProfileSizes
  | StillSizes;

export type MovieVideo = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
};

export type MovieVideosResponse = {
  id: number;
  results: MovieVideo[];
};

export type MovieCast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type MovieCrew = {
  adult: false;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type MovieCreditsResponse = {
  id: number;
  cast: MovieCast[];
  crew: MovieCrew[];
};

export type MovieRecommendation = {
  adult: false;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieRecommendationsResponse = PaginatedData<MovieRecommendation>;
