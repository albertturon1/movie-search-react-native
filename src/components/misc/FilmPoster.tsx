import {View, Image} from 'react-native';

import {ImagePathSize, getTMDBImagePath} from '@src/lib/utils';

const DEFAULT_POSTER_ASPECT_RATIO = 0.667;

export const FilmPoster = ({
  path,
  size,
  aspectRatio = DEFAULT_POSTER_ASPECT_RATIO,
  containerClassName = '',
}: {
  path: ImagePathSize['path'];
  size?: ImagePathSize['size'];
  aspectRatio?: number;
  containerClassName?: string;
}) => (
  <View
    className={`border-0.5 border-border ${containerClassName}`}
    style={{aspectRatio}}>
    {path ? (
      <Image
        source={{
          uri: getTMDBImagePath({
            path,
            size: size ?? 'w185',
          }),
        }}
        className="object-cover w-full h-full"
      />
    ) : (
      <View className="flex flex-1 bg-muted" />
    )}
  </View>
);
