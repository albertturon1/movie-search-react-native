import {DateTime} from 'luxon';

import {ImageSize} from '@interfaces/models/IFilm';
import {env} from '@src/env';

export type ImagePathSize = {
  size: ImageSize;
  path: string;
};

export function getTMDBImagePath({size, path}: ImagePathSize) {
  return `${env.API_IMAGE_BASE_URL}/${size}/${path}`;
}

export function formatRuntime(runtime: number): string {
  if (runtime < 60) return `${runtime}m`;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (runtime % 60 === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function getFilmOverview(overview: string) {
  return overview.length >= 208 ? `${overview.slice(0, 205)}...` : overview;
}

export function getReleaseDateFormated(releaseDate: string) {
  return releaseDate ? DateTime.fromISO(releaseDate).toFormat('yyyy') : '';
}

export function getTvAirtimeFormated(
  firstAirDate: string,
  lastAirDate: string,
) {
  return `${getReleaseDateFormated(firstAirDate)}-${getReleaseDateFormated(
    lastAirDate,
  )}`;
}
