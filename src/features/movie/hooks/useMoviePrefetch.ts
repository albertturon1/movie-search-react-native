import {usePrefetch} from '@redux/api/rootApi';

export const useMoviePrefetch = () => {
  const prefetchMovie = usePrefetch('movie');
  const prefetchMovieCredits = usePrefetch('movieCredits');
  const prefetchMovieVideos = usePrefetch('movieVideos');
  const prefetchMovieRecommendations = usePrefetch('movieRecommendations');
  const prefetchMovieImages = usePrefetch('movieImages');

  return (id: number) => {
    prefetchMovie(id);
    prefetchMovieCredits(id);
    prefetchMovieVideos(id);
    prefetchMovieRecommendations(id);
    prefetchMovieImages(id);
  };
};
