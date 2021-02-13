import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux'

import {Screen} from '@screens/screen.comp';
import Text from '@components/text/text.comp';
import Wallet from '@components/wallet/wallet.comp';
import {
  ButtonWrapper,
  TransactionsEmpty,
  TransactionsEmptyWrapper, TransactionsFlatList,
  TransactionsWalletWrapper, WalletTransition,
} from '@screens/transactions/transactions.styles';
import Icon from '@components/icons/icon.comp';
import {getThemeColor} from '@theme/theme.utils';
import Button from '@components/button/button.comp';
import routes from '@router/routes.config';
import TransactionMovement from '@components/transaction/transaction-movement.comp';
import {OrderTransaction} from '@redux/reducers/orders/orders.types';
import {RootReducer} from '@redux/reducers';
import {TransactionsScreenProps} from '@screens/transactions/transactions.type';

const TransactionsScreen: React.FC<TransactionsScreenProps> = (): React.FunctionComponentElement<TransactionsScreenProps> => {
  /** COMPONENT VALUES */
  const navigation = useNavigation();
  /** END OF COMPONENT VALUES */
  /** REDUX VALUES */
  const transactions: OrderTransaction[] = useSelector((state: RootReducer) => state.orders.transactions);

  /** END Of REDUX VALUES */


  const organizeTransactions = (a, b) => {
    if (a.transaction_date > b.transaction_date){ return -1; }
    if (a.transaction_date < b.transaction_date){ return 1; }
    return 0;
  }; // organizeTransactions

  /**
   * render the wallet at top of the list
   */
  const renderWallet = React.useCallback((): React.FunctionComponentElement<any> => (
    <TransactionsWalletWrapper>
      <Wallet />
      <WalletTransition />
    </TransactionsWalletWrapper>
  ), []); // renderWallet

  /**
   * Render the alert when the list is empty
   */
  const renderEmptyTransactions = React.useCallback((): React.FunctionComponentElement<any> => (
    <TransactionsEmptyWrapper>
      <TransactionsEmpty>
        <Icon name="activity" size={40} color={getThemeColor('white')} />
        <Text size="lg" center>
          Você ainda não possui nenhuma transação
        </Text>
      </TransactionsEmpty>
    </TransactionsEmptyWrapper>
  ), []); // renderEmptyTransactions


  const renderItem = React.useCallback(({ item }) => <TransactionMovement transaction={item} />, []);
  const keyExtractor = React.useCallback((item: OrderTransaction) => `${item.transaction_date}-${item.transaction_type}`, []);

  return (
    <Screen>
      <TransactionsFlatList
        ListHeaderComponent={renderWallet}
        ListEmptyComponent={renderEmptyTransactions}
        data={transactions.sort(organizeTransactions)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

      <ButtonWrapper>
        <Button onPress={() => { navigation.navigate(routes.order); }}>
          Nova ordem
        </Button>
      </ButtonWrapper>

    </Screen>
  );
};

export default TransactionsScreen;
