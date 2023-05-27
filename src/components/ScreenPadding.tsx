import {ReactNode} from 'react';

import {View} from 'react-native';

const ScreenPadding = ({children}: {children: ReactNode}) => (
  <View className={`px-3 flex flex-1 flex-col`}>{children}</View>
);

export default ScreenPadding;
