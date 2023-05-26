import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';


const styles = StyleSheet.create({
  aspectRatioOne: {aspectRatio: 1},
  flexOne: {flex: 1},
  fullSize: {width: '100%', height: '100%'},
  center: {justifyContent: 'center', alignItems: 'center'},
});

const Theme = {
  ...DefaultTheme,
  version: 2 as const, //needed for PaperProvider
  isV3: false as const, //needed for PaperProvider
  colors: {
    ...NavigationDefaultTheme.colors,
    primaryWhite: '#fffffff2', //opacity: 0.95
    secondaryWhite: '#ffffffd9', //opacity: 0.85
    tertiaryWhite: '#ffffffbf', //opacity: 0.75
    primaryBlack: '#0A0A0A',
    secondaryBlack: '#161618',
    tertiaryBlack: '#212124',
    darkGreen: '#077433',
    green: '#1AB56Aff',
    background: 'transparent',
    transparent: 'transparent',
    transparent_green: '#1AB56Acc',
    gray: '#303030',
    orange: '#cd4c15',
    joinRed: '#F41010',
    error: '#cc0000',
    cancelGray: '#505050',
    bottomSheetBlue: '#478ED6',
    bottomSheetGrey: '#383838',
    navigationBlue: '#1451AD',
    twitter: '#1DA1F2',
    facebook: '#4267B2',
    overlay: '#0A0A0Aba', //opacity; 0.5
    semiTransparent: 'rgba(28, 52, 64, 0.5)',
    loginButton: 'rgba(4, 166, 217, 1)',
  },
  styles,
  dark: true,
};

export default Theme;
