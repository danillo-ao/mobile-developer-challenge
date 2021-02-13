export enum orderTransactionTypes { sell = 'sell', buy = 'buy' }

export type TransactionType = keyof typeof orderTransactionTypes;

export type OrderTransaction = {
  transaction_type: TransactionType;
  transaction_date: number;
  transaction_amount: number;
  transaction_units: number;
};

export type OrdersReducer = {
  transactions: OrderTransaction[]
};
