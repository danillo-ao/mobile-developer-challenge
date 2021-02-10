import theme from './theme';
import {ColorsName, ColorsShade} from '@theme/theme.type';
import { get } from 'lodash';

/**
 * used to get a theme color with an optional shade
 * @param name
 * @param shade
 */
export const getThemeColor = (name: ColorsName, shade?: keyof ColorsShade): string => {
  return get(theme, ['colors', name, shade ?? 'base']);
};
