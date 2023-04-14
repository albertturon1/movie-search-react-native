import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {DefaultTheme} from 'react-native-paper';

const Theme = {
  ...DefaultTheme,
  version: 2 as const,
  isV3: false as const,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...DefaultTheme.colors,
    primaryWhite: 'rgba(255,255,255,1)',
    secondaryWhite: 'rgba(255,255,255,0.8)',
    tertiaryWhite: 'rgba(255,255,255,0.7)',
    green: '#378AF0',
    primaryBlack: '#000',
    secondaryBlack: '#161618',
    tertiaryBlack: '#303030',
    grey: '#303030',
    join_red: '#F41010',
    thin_grey_line: 'rgba(235,235,245,0.25)',
    bottomSheetBackground: 'rgba(41, 43,45,0.7)',
    bottomSheetBlue: '#478ED6',
    bottomSheetGrey: '#383838',
    navigationBlue: '#1451AD',
  },
};

export default Theme;
