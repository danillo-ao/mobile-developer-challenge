import styled from 'styled-components/native';
import {getThemeColor} from '@theme/theme.utils';

export const TransactionsWalletWrapper = styled.View`
  width: 100%;
  background-color: ${getThemeColor('secondary')};
  flex-direction: column;
`;
