import {ImageSize} from '@components/interfaces/IMovieAPi';
import {env} from '@src/env';

export function getTMDBImagePath({
  size,
  path,
}: {
  size: ImageSize;
  path: string;
}) {
  return `${env.API_IMAGE_BASE_URL}/${size}/${path}`;
}

export function formatRuntime(runtime: number): string {
  if (runtime < 60) return `${runtime}m`;

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
}
