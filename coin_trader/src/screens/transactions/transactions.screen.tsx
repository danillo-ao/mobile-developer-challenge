import * as React from 'react';
import {FlatList} from 'react-native';

import {Screen} from '@screens/screen.comp';
import Text from '@components/text/text.comp';
import Wallet from '@components/wallet/wallet.comp';
import {TransactionsWalletWrapper} from '@screens/transactions/transactions.styles';

const TransactionsScreen: React.FC<any> = (): React.FunctionComponentElement<any> => {

  const renderWallet = () => (
    <TransactionsWalletWrapper>
      <Wallet />
    </TransactionsWalletWrapper>
  );

  return (
    <Screen>
      <FlatList
        ListHeaderComponent={renderWallet}
        data={[]}
        renderItem={() => null}
      />
      <Text color="white">Transactions screen</Text>
    </Screen>
  );
};

export default TransactionsScreen;
