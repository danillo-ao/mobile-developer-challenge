import * as React from 'react';

import { useNavigation } from '@react-navigation/native';


import { Screen } from '@screens/screen.comp';
import Text from '@components/text/text.comp';
import Wallet from '@components/wallet/wallet.comp';
import {
  ButtonWrapper,
  TransactionsEmpty,
  TransactionsEmptyWrapper, TransactionsFlatList,
  TransactionsWalletWrapper, WalletTransition,
} from '@screens/transactions/transactions.styles';
import Icon from '@components/icons/icon.comp';
import { getThemeColor } from '@theme/theme.utils';
import Button from '@components/button/button.comp';
import routes from '@router/routes.config';

const TransactionsScreen: React.FC<any> = (): React.FunctionComponentElement<any> => {

  const navigation = useNavigation();

  /**
   * render the wallet at top of the list
   */
  const renderWallet = (): React.FunctionComponentElement<any> => (
    <TransactionsWalletWrapper>
      <Wallet />
      <WalletTransition />
    </TransactionsWalletWrapper>
  ); // renderWallet

  /**
   * Render the alert when the list is empty
   */
  const renderEmptyTransactions = (): React.FunctionComponentElement<any> => (
    <TransactionsEmptyWrapper>
      <TransactionsEmpty>
        <Icon name="activity" size={40} color={getThemeColor('white')} />
        <Text size="lg" center>
          Você ainda não possui nenhuma transação
        </Text>
      </TransactionsEmpty>
    </TransactionsEmptyWrapper>
  ); // renderEmptyTransactions

  return (
    <Screen>
      <TransactionsFlatList
        ListHeaderComponent={renderWallet}
        ListEmptyComponent={renderEmptyTransactions}
        data={[]}
        renderItem={() => null}
      />

      <ButtonWrapper>
        <Button onPress={() => { navigation.navigate(routes.order) }}>
          Nova ordem
        </Button>
      </ButtonWrapper>

    </Screen>
  );
};



export default TransactionsScreen;
