import {DateTime} from 'luxon';
import {View, Text} from 'react-native';

import {formatRuntime} from '@src/lib/utils';

const MovieYearRuntimeAdult = ({
  releaseDate,
  runtime,
  adult,
}: {
  releaseDate: string;
  runtime?: number;
  adult: boolean;
}) => (
  <View className="flex flex-row gap-x-3 items-center">
    <Text>
      {releaseDate.length
        ? DateTime.fromISO(releaseDate).toFormat('yyyy')
        : 'No release date'}
    </Text>
    {runtime && <Text>{formatRuntime(runtime)}</Text>}
    {adult && <Text>{'For adults'}</Text>}
  </View>
);

export default MovieYearRuntimeAdult;
