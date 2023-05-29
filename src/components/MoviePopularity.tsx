import {View} from 'react-native';
import {Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Theme from '@src/Theme';

const MoviePopularity = ({
  voteAverage,
  voteCount,
}: {
  voteAverage: number;
  voteCount: number;
}) => {
  const roundedVoteAverage = voteAverage.toFixed(2);
  const numberOfVotesCounter = voteCount > 1 ? 'votes' : 'vote';

  return (
    <View className="w-full flex flex-row items-center">
      <View className="flex flex-row gap-x-2 mr-4 items-center">
        <FontAwesome name="star" color={Theme.colors.yellowStar} size={20} />
        <Text className="text-xl font-medium text-tertiaryBlack">
          {roundedVoteAverage}
        </Text>
      </View>
      <Text className="text-sm mt-0.5">{`${voteCount} ${numberOfVotesCounter}`}</Text>
    </View>
  );
};

export default MoviePopularity;
