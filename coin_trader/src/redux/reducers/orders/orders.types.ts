export enum OrderTransactionTypes { sell = 'sell', buy = 'buy' }

export type OrderTransaction = {
  transaction_type: keyof typeof OrderTransactionTypes;
  transaction_date: number;
  transaction_amount: string;
  transaction_units: number;
};

export type OrdersReducer = {
  transactions: OrderTransaction[]
};
