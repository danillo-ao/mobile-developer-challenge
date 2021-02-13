import {OrderTransaction} from '@redux/reducers/orders/orders.types';

export type TransactionsScreenProps = {
  store: {
    transactions: OrderTransaction[];
  }
};
