import {ColorsName, ColorsShade, ThemeFontSizes, ThemeFontsNames} from '@theme/theme.type';
import {TextProps as ReactTextProps} from 'react-native';

export type TextProps = ReactTextProps & {
  children: string | string[];
  family?: ThemeFontsNames;
  color?: ColorsName;
  shade?: keyof ColorsShade;
  size?: keyof ThemeFontSizes;
  center?: boolean;
} ;
