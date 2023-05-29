import {View, Text} from 'react-native';

import {formatRuntime} from '@src/lib/utils';

export const FilmYearRuntimeAdult = ({
  releaseDate,
  runtime,
  adult,
}: {
  releaseDate: string;
  runtime?: number;
  adult: boolean;
}) => (
  <View className="flex flex-row gap-x-3 items-center">
    <Text>{releaseDate ?? 'No release date'}</Text>
    {runtime && <Text>{formatRuntime(runtime)}</Text>}
    {adult && <Text>{'For adults'}</Text>}
  </View>
);
