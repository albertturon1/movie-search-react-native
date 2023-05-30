import {
  Collection,
  FilmCore,
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from '../models/IFilm';

export type MovieShort = {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
} & FilmCore;

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
  status: string;
  tagline: string;
} & Omit<MovieShort, 'genre_ids' | 'media_type'>;
