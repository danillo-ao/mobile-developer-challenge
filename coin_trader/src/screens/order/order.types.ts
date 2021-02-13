import {WalletReducer} from '@redux/reducers/wallet/wallet.types';
import {BitcoinReducer} from '@redux/reducers/bitcoin/bitcoin.types';
import {OrderTransaction} from '@redux/reducers/orders/orders.types';

export type OrderScreenProps = {
  actions?: {
    getBitcoinsData(): Promise<void>;
    sellOrder(payload: OrderTransaction): Promise<boolean>;
    buyOrder(payload: OrderTransaction): Promise<boolean>;
  },
  store?: {
    bitcoin: BitcoinReducer,
    wallet: WalletReducer,
  }
};
