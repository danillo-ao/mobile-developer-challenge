import styled from 'styled-components';
import {View, TouchableOpacity, Animated} from 'react-native';
import Text from '@components/text/text.comp';
import {getThemeColor} from '@theme/theme.utils';

export const SnackbarContent = styled(Animated.View)<{ background: string }>`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  min-height: 70px;
  background-color: ${({ background }) => background};
  border: 0 solid ${getThemeColor('blue', 'darker')};
  border-top-width: 1px;
`;
export const SnackbarInner = styled(View)`
  width: 100%;
  flex: 1;
  flex-direction: row;
  padding: ${({ theme }) => theme.units.padding}px;
  align-items: center;
  justify-content: center;
`;
export const SnackbarMessage = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const SnackbarMessageText = styled(Text)`
  width: 100%;
  position: relative;
`;

export const SnackbarCloser = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
