import styled, {css} from 'styled-components/native';
import { getThemeColor } from '@theme/theme.utils';
import {ScreenProps} from '@screens/screen.types';

export const Screen = styled.View<ScreenProps>`
  flex: 1;
  flex-direction: column;
  background-color: ${({ background }) => !!background ? background : getThemeColor('secondary')};  
  padding: ${({ pad, theme }) => !!pad ? theme.units.padding : 0}px;

  ${({ centerVertical }) => !!centerVertical && css` justify-content: center; `};
  ${({ startVertical }) => !!startVertical && css` justify-content: flex-start; `};
  ${({ endVertical }) => !!endVertical && css` justify-content: flex-end; `};
  
  ${({ centerHorizontal }) => !!centerHorizontal && css` align-items: center; `};
  ${({ startHorizontal }) => !!startHorizontal && css` align-items: flex-start; `};
  ${({ endHorizontal }) => !!endHorizontal && css` align-items: flex-end; `};
  
  ${({ center }) => !!center && css` align-items: center; justify-content: center; `};
  ${({ start }) => !!start && css` align-items: flex-start; justify-content: flex-start; `};
  ${({ end }) => !!end && css` align-items: flex-end; justify-content: flex-end; `};
  

`;

export const ScreenScroll = styled.ScrollView`
  width: 100%;
  padding: ${({ theme }) => theme.units.padding}px;
`;

export const ScreenScrollInner = styled.View`
  flex-direction: column;
  padding: 0 0 60px 0;
`;
