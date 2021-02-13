import styled from 'styled-components/native';
import {getThemeColor} from '@theme/theme.utils';
import Text from '@components/text/text.comp';


export const ImageLogo = styled.Image`
  width: 100px;
  height: 100px;
  tint-color: ${getThemeColor('primary')};
  margin-bottom: ${({ theme }) => theme.units.padding}px;
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.units.padding * 3}px;
`;

export const ClearButton = styled.TouchableOpacity`
  padding: ${({ theme }) => (theme.units.padding / 2)}px;
  position: absolute;
  top: ${({ theme }) => theme.units.padding}px;
  right: ${({ theme }) => theme.units.padding}px;
  background-color: ${getThemeColor('secondary', 'lighter')};
  border-radius: ${({ theme }) => (theme.units.borderRadius * 1.5)}px;
  opacity: 0.5;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ClearButtonLabel = styled(Text)`
  margin-left: ${({ theme }) => theme.units.padding / 8}px;
`;
