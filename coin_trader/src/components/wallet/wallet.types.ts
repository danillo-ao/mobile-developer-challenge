import {WalletReducer} from '@redux/reducers/wallet/wallet.types';

export type WalletProps = {
  store: {
    errorBtc: boolean;
    wallet: WalletReducer
  }
};
