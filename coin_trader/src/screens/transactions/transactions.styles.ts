import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import {getThemeColor} from '@theme/theme.utils';

export const ButtonWrapper = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.units.padding}px;
  background-color: ${getThemeColor('secondary', 'lighter')};
`;

export const TransactionsFlatList = styled(FlatList)`
  background-color: ${getThemeColor('secondary', 'lighter')};
`;

export const TransactionsWalletWrapper = styled.View`
  width: 100%;
  background-color: ${getThemeColor('secondary')};
  flex-direction: column;
`;

export const WalletTransition = styled.View`
  width: 100%;
  height: 30px;
  margin-bottom: -10px;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: ${getThemeColor('secondary', 'lighter')};
`;

export const TransactionsEmptyWrapper = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.units.padding}px;
`;

export const TransactionsEmpty = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.units.padding}px;
  border-radius: ${({ theme }) => theme.units.borderRadius}px;
`;
