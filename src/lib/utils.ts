import {ImageSize} from '@interfaces/api/IMovieApi';
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
  return `${hours}h ${minutes}m`;
}
