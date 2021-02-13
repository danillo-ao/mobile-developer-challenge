import {WalletReducer} from '@redux/reducers/wallet/wallet.types';

export type WalletProps = {
  actions?: {
    getBitcoinsData(): Promise<void>;
  };
  store?: {
    errorBtc: boolean;
    wallet: WalletReducer;
  }
};
