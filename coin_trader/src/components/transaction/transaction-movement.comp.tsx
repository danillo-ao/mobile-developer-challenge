import * as React from 'react';
import { get } from 'lodash';

import {TransactionMovementProps} from '@components/transaction/transaction-movement.types';
import {
  TransactionMovementComp, TransactionMovementDetailRow, TransactionMovementDetails,
  TransactionMovementIcon, TransactionMovementIconImg,
  TransactionMovementInner
} from '@components/transaction/transaction-movement.styles';
import {getThemeColor} from '@theme/theme.utils';
import {OrderTransaction, orderTransactionTypes} from '@redux/reducers/orders/orders.types';
import Text from '@components/text/text.comp';
import {currencyFormat, parseBtc} from '@utils/currency.util';
import {getDate} from '@utils/date.util';

const btcIcon = require('@assets/images/bitcoin.png');
const mnyIcon = require('@assets/images/money.png');

const TransactionMovement: React.FC<TransactionMovementProps> = (props: TransactionMovementProps): React.FunctionComponentElement<TransactionMovementProps> => {

  const transaction: OrderTransaction = get(props, ['transaction']);

  const isOrderBuy = (transaction.transaction_type === orderTransactionTypes.buy);

  const iconColor = isOrderBuy ? getThemeColor('primary') : getThemeColor('green');
  const iconImage = isOrderBuy ? btcIcon : mnyIcon;
  const title = isOrderBuy ? 'Compra' : 'Venda';

  const orderResult = isOrderBuy ? `+ ${parseBtc(transaction.transaction_units)} unid.` : `R$ + ${currencyFormat(transaction.transaction_amount)}`;
  const orderCost = isOrderBuy ? `R$ -${currencyFormat(transaction.transaction_amount)}` : `- ${parseBtc(transaction.transaction_units)} unid.`;

  const orderDate = getDate(transaction.transaction_date);

  return (
    <TransactionMovementComp>
      <TransactionMovementInner>

        <TransactionMovementIcon>
          <TransactionMovementIconImg source={iconImage} color={iconColor} />
        </TransactionMovementIcon>
        <TransactionMovementDetails>
          <TransactionMovementDetailRow>
            <Text family="titleBold" size="xl">{title}</Text>
            <Text color="green">{orderResult}</Text>
          </TransactionMovementDetailRow>
          <TransactionMovementDetailRow>
            <Text size="ssm">{orderDate}</Text>
            <Text size="sm" color="red" shade="lighter">{orderCost}</Text>
          </TransactionMovementDetailRow>
        </TransactionMovementDetails>

      </TransactionMovementInner>
    </TransactionMovementComp>
  );
};

export default TransactionMovement;
