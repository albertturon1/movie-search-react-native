import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {DefaultTheme} from 'react-native-paper';
import resolveConfig from 'tailwindcss/resolveConfig';
import {z} from 'zod';

import tailwindConfig from '@/tailwind.config';

type TailwindColors = z.infer<typeof TailwindColorsSchema>;

const {theme} = resolveConfig(tailwindConfig);

const ColorSchema = z.object({
  50: z.string(),
  100: z.string(),
  200: z.string(),
  300: z.string(),
  400: z.string(),
  500: z.string(),
  600: z.string(),
  700: z.string(),
  800: z.string(),
  900: z.string(),
  950: z.string(),
});

const tailwindColors = theme?.colors;

const TailwindColorsSchema = z
  .object({
    slate: ColorSchema,
    gray: ColorSchema,
    zinc: ColorSchema,
    neutral: ColorSchema,
    stone: ColorSchema,
    red: ColorSchema,
    orange: ColorSchema,
    amber: ColorSchema,
    yellow: ColorSchema,
    lime: ColorSchema,
    green: ColorSchema,
    emerald: ColorSchema,
    teal: ColorSchema,
    cyan: ColorSchema,
    sky: ColorSchema,
    blue: ColorSchema,
    indigo: ColorSchema,
    violet: ColorSchema,
    purple: ColorSchema,
    fuchsia: ColorSchema,
    pink: ColorSchema,
    rose: ColorSchema,
    current: z.string(),
    transparent: z.string(),
    inherit: z.string(),
    white: z.string(),
    black: z.string(),
    yellowStar: z.string(),
    background: z.string(),
  })
  .strict({
    message:
      'There is a difference between TailwindColorScheme and tailwind.config.js. Compare the scheme and colors',
  });
//runtime check for colors in tailwind.config.js
TailwindColorsSchema.parse(tailwindColors);

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
    ...(theme?.colors as TailwindColors),
  },
  styles,
  dark: false,
};

export default Theme;
