import { combineReducers } from 'redux';

import {transactionsReducer} from '@redux/reducers/transactions/transactions.reducer';
import {TransactionReducer} from '@redux/reducers/transactions/transactions.types';

export type RootReducer = {
  transactions: TransactionReducer
}

const rootReducer = combineReducers({
  transactions: transactionsReducer,
});

export default rootReducer;
