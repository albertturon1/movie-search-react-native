import {DateTime} from 'luxon';
import {View, Text} from 'react-native';

import {formatRuntime} from '@src/lib/utils';

const MovieYearRuntimeAdult = ({
  releaseDate,
  runtime,
  adult,
}: {
  releaseDate: string;
  runtime: number | undefined;
  adult: boolean;
}) => (
  <View className="flex flex-row gap-x-3 justify-center items-center">
    <Text>{DateTime.fromISO(releaseDate).toFormat('yyyy')}</Text>
    {runtime && <Text>{formatRuntime(runtime)}</Text>}
    {adult && <Text>{'For adults'}</Text>}
  </View>
);

export default MovieYearRuntimeAdult;
