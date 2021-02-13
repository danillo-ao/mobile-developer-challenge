import {Dispatch} from 'redux';
import {get_bitcoin_data} from '@sdk/api/bitcoins/bitcoins.api';
import {Action, actionType} from '@redux/actions/actions.types';

import {WalletReducer} from '@redux/reducers/wallet/wallet.types';

/**
 * used to get and save the current values of bitcoin
 * reset and save as error true if something goes wrong
 */
export const getBitcoinsData = () => async (dispatch: Dispatch<Action>, getState): Promise<void> => {
  try {
    const getBitcoins = await get_bitcoin_data();

    if (getBitcoins.ok) {

      const wallet: WalletReducer = getState().wallet;
      const bitcoins = getBitcoins?.data?.ticker;
      const payload = { last: bitcoins.last, vol: bitcoins.vol, date: bitcoins.date };

      // calc the new balance based on bitcoin price and user wallet units
      const btcBalance = (wallet.btc_unit * bitcoins.last);

      dispatch({ type: actionType.SAVE_BITCOINS_DATA, payload });
      dispatch({ type: actionType.SAVE_BTC_BALANCE, payload: { btc: btcBalance } });

    } else {
      dispatch({ type: actionType.ERROR_BITCOINS_DATA });
    }

  } catch (e) {
    // error on get bitcoins data
    dispatch({ type: actionType.ERROR_BITCOINS_DATA });
  }
}; // getBitcoinsData

