import {ReactNode} from 'react';

import {View, StyleSheet} from 'react-native';

import {SCREEN_HORIZONTAL_PADDING} from '@constants/Globals';

const ScreenPadding = ({children}: {children: ReactNode}) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    flex: 1,
  },
});

export default ScreenPadding;
