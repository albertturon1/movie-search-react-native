import {ReactNode} from 'react';

import {View} from 'react-native';

import {SCREEN_HORIZONTAL_PADDING} from '@constants/Globals';

const ScreenPadding = ({children}: {children: ReactNode}) => (
    <View className={`px-[16px] flex flex-1 flex-col`}>
      {children}
    </View>
  );

export default ScreenPadding;
