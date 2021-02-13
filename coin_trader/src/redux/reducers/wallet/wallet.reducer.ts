import {get, cloneDeep} from 'lodash';
import {Action, actionType} from '@redux/actions/actions.types';
import {WalletReducer} from '@redux/reducers/wallet/wallet.types';

const initialState: WalletReducer = {
  brl: 10000,
  btc: 0,
  btc_unit: 0.0,
};

export const walletReducer = (state: WalletReducer = initialState, action: Action) => {
  const newState = cloneDeep(state);
  let payload;

  switch (action.type) {

    case actionType.SAVE_BTC_BALANCE:
      payload = { btc: get(action, ['payload', 'btc'], state.btc) };
      return { ...newState, ...payload };

    case actionType.SAVE_BTC_UNITS:
      payload = {
        btc: get(action, ['payload', 'btc'], state.btc),
        btc_unit: get(action, ['payload', 'btc_unit'], state.btc_unit),
      };
      return { ...newState, ...payload };

    case actionType.SAVE_WALLET_BALANCE:
      return action.payload;

    default:
      return state;
  }
};
