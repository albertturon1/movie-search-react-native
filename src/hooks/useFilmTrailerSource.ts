import {useMemo} from 'react';

import {Video} from '@interfaces/models/IFilm';

export const useFilmTrailerSource = (videos: Video[] | undefined) =>
  useMemo(() => {
    if (!videos || !videos.length) return;
    return videos
      .filter(
        video =>
          video.type.toLowerCase() === 'trailer' &&
          video.official &&
          video.site === 'YouTube',
      )
      .sort((a, b) => (a.published_at < b.published_at ? 1 : -1))[0];
  }, [videos]);
