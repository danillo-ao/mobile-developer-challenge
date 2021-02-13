import styled from 'styled-components/native';
import {getThemeColor} from '@theme/theme.utils';
import CurrencyInput from 'react-native-currency-input';
import {Dimensions} from 'react-native';

export const OrderPrice = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: ${({ theme }) => (theme.units.padding * 2)}px;
  margin-top: ${({ theme }) => theme.units.padding}px;
  border-bottom-width: 1px;
  border-color: ${getThemeColor('primary', 'lighter')};
`;

export const OrderPriceValue = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => (theme.units.padding / 2)}px;
  max-height: 31px;
`;

export const OrderPriceDetails = styled.View`
  width: 100%;
  flex-direction: row;
  opacity: 0.7;
  justify-content: space-between;
  min-height: 15px;
`;


export const OrderTypes = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: ${getThemeColor('primary', 'lighter')};
`;

export const BitcoinLastPriceTitle = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const CopyToClipboardAction = styled.TouchableOpacity`
  margin-left: ${({ theme }) => (theme.units.padding / 2)}px;
`;

export const OrderType = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.units.padding}px 0;
`;

export const OrderLine = styled.View<{ lgm?: boolean; nm?: boolean }>`
  width: 100%;
  margin-top: ${({ theme, nm, lgm }) => nm ? 0 : lgm ? theme.units.padding * 2 : theme.units.padding}px;
  flex-direction: column;
`;

export const OrderLineRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const OrderShortcutsValues = styled.View`
  width: ${({ theme }) => (Dimensions.get('window').width - theme.units.padding)}px;
  margin-left: -${({ theme }) => (theme.units.padding / 2)}px;
  margin-top: 10px;
  flex-direction: row;
  min-height: 36px;
`;

export const OrderShortcut = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.units.padding / 2}px;
`;

export const OrderShortcutAction = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  min-height: 37px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: ${({ theme }) => theme.units.borderRadius}px;
  padding: ${({ theme }) => theme.units.padding / 2}px 0;
  border-color: ${getThemeColor('primary')};
`;


export const OrderResumeBalance = styled.View`
  width: 100%;
  position:relative;
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.units.padding * 2}px;
`;

export const OrderResumeBalanceInner = styled.View`
  background-color: ${getThemeColor('secondary', 'lighter')};
  padding: ${({ theme }) => theme.units.padding / 2}px;
  border-radius: ${({ theme }) => theme.units.borderRadius}px;
  width: 100%;
  flex-direction: row;
`;

export const OrderFinishAction = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.units.padding / 2}px;
`;

export const OrderResumeCol = styled.View<{ toEnd?: boolean }>`
  flex-direction: column;
  flex: 1;
  
  align-items: ${({ toEnd }) => toEnd ? 'flex-end' : 'flex-start' };
`;


export const OrderCurrencyInput = styled(CurrencyInput)`
  width: 100%;
  border-radius: ${({ theme }) => theme.units.borderRadius}px;
  background-color: ${getThemeColor('white')};
  padding: ${({ theme }) => `${theme.units.padding / 2}px ${theme.units.padding}px`};
  margin-top: 5px;
`;
