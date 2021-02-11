import styled from 'styled-components/native';
import {getThemeColor} from '@theme/theme.utils';

export const HeaderComp = styled.View`
  width: 100%;
  height: ${({ theme }) => theme.units.headerHeight}px;
  background-color: ${getThemeColor('primary', 'lighter')};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const HeaderAction = styled.View`
  width: ${({ theme }) => theme.units.headerHeight}px;
  height: ${({ theme }) => theme.units.headerHeight}px;
  align-items: center;
  justify-content: center;
`;

export const HeaderActionPress = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitleWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
