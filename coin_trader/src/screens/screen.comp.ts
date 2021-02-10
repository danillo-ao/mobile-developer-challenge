import styled from 'styled-components/native';
import { getThemeColor } from '@theme/theme.utils';

export const Screen = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${getThemeColor('secondary')};
`;

export const ScreenScroll = styled.ScrollView`
  width: 100%;
  padding: ${({ theme }) => theme.units.padding}px;
`;
