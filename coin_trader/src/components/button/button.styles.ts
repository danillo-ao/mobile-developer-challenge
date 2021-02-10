import styled from 'styled-components/native';
import {getThemeColor} from '@theme/theme.utils';

export const ButtonComp = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.units.borderRadius}px;
  padding: ${({ theme }) => theme.units.padding}px;
  background-color: ${getThemeColor('primary')};
`;
