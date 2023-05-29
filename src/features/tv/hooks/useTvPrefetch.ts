import {usePrefetch} from '@redux/api/rootApi';

export const useTvPrefetch = () => {
  const prefetchTv = usePrefetch('tv');
  const prefetchTvCredits = usePrefetch('tvCredits');
  const prefetchTvVideos = usePrefetch('tvVideos');
  const prefetchTvRecommendations = usePrefetch('tvRecommendations');
  const prefetchTvImages = usePrefetch('tvImages');

  return (id: number) => {
    prefetchTv(id);
    prefetchTvCredits(id);
    prefetchTvVideos(id);
    prefetchTvRecommendations(id);
    prefetchTvImages(id);
  };
};
