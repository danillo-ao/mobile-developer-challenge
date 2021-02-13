import styled from 'styled-components/native';
import {getThemeColor} from '@theme/theme.utils';

export const TransactionMovementComp = styled.View`
  width: 100%;
  position: relative;
  padding: 0 ${({ theme }) => theme.units.padding}px;
  margin: 0 0 ${({ theme }) => theme.units.padding}px 0;
`;

export const TransactionMovementInner = styled.View`
  padding: ${({ theme }) => theme.units.padding}px;
  border-radius: ${({ theme }) => (theme.units.borderRadius * 3)}px;
  background-color: ${getThemeColor('secondary')};
  flex-direction: row;
`;

export const TransactionMovementIcon = styled.View `
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.units.padding}px;
  border-radius: 60px;
  background-color: ${getThemeColor('white')};
`;

export const TransactionMovementIconImg = styled.Image<{ color?: string }>`
  width: 30px;
  height: 30px;
  position: relative;
  resizeMode: contain;
  tintColor: ${({ color }) => !!color ? color : getThemeColor('secondary')}
`;

export const TransactionMovementDetails = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const TransactionMovementDetailRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
