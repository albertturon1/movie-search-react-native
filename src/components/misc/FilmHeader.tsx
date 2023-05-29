import {View} from 'react-native';
import {Text} from 'react-native-paper';

import {FilmBackArrow} from '@components/misc/FilmBackArrow';

import {FilmYearRuntimeAdult} from './FilmYearRuntimeAdult';

export const FilmHeader = ({
  name,
  releaseDate,
  adult,
  runtime,
}: {
  name: string;
  releaseDate: string;
  adult: boolean;
  runtime?: number;
}) => (
  <View className="relative flex flex-col gap-y-1.5 px-10 overflow-hidden">
    <FilmBackArrow />
    <Text className="text-[25px] text-black leading-[30px] text-center font-medium">
      {name}
    </Text>
    <View className="self-center">
      <FilmYearRuntimeAdult
        releaseDate={releaseDate}
        adult={adult}
        runtime={runtime}
      />
    </View>
  </View>
);
