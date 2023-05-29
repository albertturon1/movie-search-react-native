import {useMemo} from 'react';

import {MovieShort} from '@interfaces/models/IMovie';
import {TvShort} from '@interfaces/models/ITv';

const useFilmRecommendations = <
  T extends MovieShort[] | TvShort[] | undefined,
>({
  data,
  selectedFilmID,
}: {
  data: T;
  selectedFilmID: number;
}) =>
  useMemo(() => {
    if (!data) return [];
    return [...data]
      .filter(
        (v, i, a) =>
          v.id !== selectedFilmID && a.findIndex(v2 => v2.id === v.id) === i,
      )
      .sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
  }, [selectedFilmID, data]);

export default useFilmRecommendations;
