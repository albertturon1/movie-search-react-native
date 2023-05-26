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
