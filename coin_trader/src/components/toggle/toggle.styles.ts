import styled from 'styled-components/native';
import { Animated } from 'react-native';
import {getThemeColor} from '@theme/theme.utils';


export const ToggleContent = styled.TouchableOpacity`
  position: relative;
  width: 43px;
  align-items: center;
  justify-content: center;
`;

export const ToggleBody = styled.View`
  width: 40px;
  height: 15px;
  background-color: ${getThemeColor('green')};
  border-radius: 10px;
  overflow: hidden;
`;

export const ToggleBodyFill = styled(Animated.View)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 10px;
  background-color: ${getThemeColor('primary')};
  transform: translateX(-40px);
`;

export const ToggleCircle = styled(Animated.View)`
  width: 25px;
  height: 25px;
  border-radius: 30px;
  background-color: ${getThemeColor('primary', 'darker')};
  position: absolute;
  left: -10%;
  top: -5px;
  border-width: 1px;
  border-color: ${getThemeColor('secondary', 'lighter')};
`;
