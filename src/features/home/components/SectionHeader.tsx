import {Pressable, View} from 'react-native';
import {Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {SCREEN_HORIZONTAL_PADDING} from '@constants/Globals';

const SectionHeader = ({
  title,
  buttonTitle,
  onButtonPress,
  className = '',
}: {
  title: string;
  buttonTitle: string;
  onButtonPress: () => void;
  className?: string;
}) => (
  <View
    className={`flex flex-row w-full items-center justify-between ${className} mb-1`}
    style={{paddingLeft: SCREEN_HORIZONTAL_PADDING}}>
    <Text className="text-xl font-bold">{title}</Text>
    <Pressable
      onPress={onButtonPress}
      className="flex flex-row gap-x-0.5 p-2 items-center">
      <Text>{buttonTitle}</Text>
      <Ionicons name="chevron-forward" size={16} />
    </Pressable>
  </View>
);

export default SectionHeader;
