import * as React from 'react';
import { get } from 'lodash';
import styled from 'styled-components/native';

import {TextProps} from '@components/text/text.types';
import {getThemeColor} from '@theme/theme.utils';
import {ColorsName, ColorsShade, ThemeFontSizes, ThemeFontsNames} from '@theme/theme.type';

const TextComp = styled.Text<Partial<TextProps>>`
  font-family: ${({ theme, family }) => theme.fonts[family]};
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  color: ${({ color, shade }) => getThemeColor(color, shade)};
  text-align: ${({ center }) => !!center ? 'center' : 'left'};
`;

const Text: React.FC<TextProps> = (props: TextProps): React.FunctionComponentElement<TextProps> => {

  const family: ThemeFontsNames = get(props, ['family'], 'default');
  const color: ColorsName = get(props, ['color'], 'black');
  const shade: keyof ColorsShade = get(props, ['shade'], 'base');
  const size: keyof ThemeFontSizes = get(props, ['size'], 'md');

  return (
    <TextComp {...props} family={family} color={color} shade={shade} size={size} center={props.center}>
      {props.children}
    </TextComp>
  );
};



export default Text;
