import {combineReducers} from 'redux';

import {BitcoinReducer} from '@redux/reducers/bitcoin/bitcoin.types';
import {bitcoinReducer} from '@redux/reducers/bitcoin/bitcoin.reducer';
import {OrdersReducer} from '@redux/reducers/orders/orders.types';
import {ordersReducer} from '@redux/reducers/orders/orders.reducer';
import {WalletReducer} from '@redux/reducers/wallet/wallet.types';
import {walletReducer} from '@redux/reducers/wallet/wallet.reducer';

export type RootReducer = {
  bitcoin: BitcoinReducer
  orders: OrdersReducer
  wallet: WalletReducer
}

export const reducers = {
  bitcoin: bitcoinReducer,
  wallet: walletReducer,
  orders: ordersReducer,
};

const rootReducer = combineReducers({ ...reducers });

export default rootReducer;
