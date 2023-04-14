import {SCREEN_HORIZONTAL_PADDING} from '@constants/Globals';
import {ReactNode} from 'react';
import {View} from 'react-native';

const ScreenPadding = ({children}: {children: ReactNode}) => {
  return (
    <View className={`px-[16px] flex flex-1 flex-col`}>
      {children}
    </View>
  );
};

export default ScreenPadding;
