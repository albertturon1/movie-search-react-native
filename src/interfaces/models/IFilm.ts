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

export type Genre = {
  id: number;
  name: string;
};

export interface GenresResponse {
  genres: Genre[];
}

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

export type Video = {
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

export type FilmImage = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type Cast = {
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

export type Crew = {
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

export type FilmCore = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: string[];
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};
