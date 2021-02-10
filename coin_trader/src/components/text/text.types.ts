import {ColorsName, ColorsShade, ThemeFontSizes, ThemeFontsNames} from '@theme/theme.type';

export type TextProps = {
  children: string;
  family?: ThemeFontsNames;
  color?: ColorsName;
  shade?: keyof ColorsShade;
  size?: keyof ThemeFontSizes;
};
