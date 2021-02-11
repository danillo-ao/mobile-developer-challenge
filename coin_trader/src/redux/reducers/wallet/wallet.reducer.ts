import { set, cloneDeep } from 'lodash';
import {Action} from '@redux/actions/actions.type';
import {WalletReducer} from '@redux/reducers/wallet/wallet.types';

const initialState: WalletReducer = {
  brl: 10000,
  btc: 0,
  btc_unit: 0.0,
};

export const walletReducer = (state: WalletReducer = initialState, action: Action) => {
  const newState = cloneDeep(state);

  switch (action.type) {
    // case actionType.SAVE_TOKEN:
    //   set(newState, ["token"], action.payload.token);
    //   return newState;

    default:
      return state;
  }
};
