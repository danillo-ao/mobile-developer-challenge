import theme from './theme';
import {ColorsName, ColorsShade} from '@theme/theme.type';
import { get } from 'lodash';

/**
 * used to get a theme color with an optional shade
 * @param name
 * @param shade
 * @param alpha
 */
export const getThemeColor = (name: ColorsName, shade?: keyof ColorsShade, alpha?: string): string => {
  const color = get(theme, ['colors', name, shade ?? 'base']);
  return !!alpha ? `${color}${alpha}` : color;
};
