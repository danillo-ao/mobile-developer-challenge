import {WalletReducer} from '@redux/reducers/wallet/wallet.types';
import {BitcoinReducer} from '@redux/reducers/bitcoin/bitcoin.types';

export type OrderScreenProps = {
  actions?: {
    getBitcoinsData(): Promise<void>;
  },
  store?: {
    bitcoin: BitcoinReducer,
    wallet: WalletReducer,
  }
};
