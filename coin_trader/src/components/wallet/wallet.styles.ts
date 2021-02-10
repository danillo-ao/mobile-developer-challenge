import styled, { css } from 'styled-components/native';
import {getThemeColor} from '@theme/theme.utils';

export const WalletComp = styled.View`
  width: 100%;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.units.padding}px;
`;

export const WalletCard = styled.View`
  width: 100%;
  background-color: ${getThemeColor('cyan')};
  border-radius: ${({ theme }) => theme.units.borderRadius * 2}px;
  padding: ${({ theme }) => theme.units.padding}px;
`;

export const WalletActions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const WalletBalance = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const WalletBalanceCoin = styled.View<{ toEnd?: boolean }>`
  flex-direction: column;
  margin-top: 10px;
  
  ${({ toEnd }) => !toEnd && css` padding-right: ${({ theme }) => (theme.units.padding / 2)}px; ` };
  ${({ toEnd }) => !!toEnd && css` flex: 1; align-items: flex-end; padding-left: ${({ theme }) => (theme.units.padding / 2)}px;`};
`;
