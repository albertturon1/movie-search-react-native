import {ReactNode} from 'react';

import {View, StyleSheet} from 'react-native';

import {SCREEN_HORIZONTAL_PADDING} from '@constants/Globals';
import Theme from '@src/Theme';

const ScreenPadding = ({
  children,
  flex = true,
}: {
  children: ReactNode;
  flex?: boolean;
}) => (
  <View style={[styles.container, flex && Theme.styles.flexOne]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
});

export default ScreenPadding;
