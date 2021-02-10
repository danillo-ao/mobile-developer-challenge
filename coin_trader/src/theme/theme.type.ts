import {
  colors,
  fonts,
  fontSizes,
  units,
} from '@theme/theme.values';

/** COLORS TYPES */
export type ColorsName = 'primary' | 'secondary' | 'black' | 'white' | 'success' | 'error';
export type ColorsShade = { base: string; lighter?: string; darker?: string }
export type ThemeColorShade = {
  [color in ColorsName]: ColorsShade
}
export type ThemeColors = typeof colors;
/** END OF COLORS TYPES */

/** FONTS TYPES */
export type ThemeFonts = typeof fonts;
export type ThemeFontSizes = typeof fontSizes;
/** END OF FONTS TYPES */

export type ThemeUnits = typeof units;

export type Theme = {
  colors: ThemeColors,
  fonts: ThemeFonts,
  fontSizes: ThemeFontSizes,
  units: ThemeUnits,
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
