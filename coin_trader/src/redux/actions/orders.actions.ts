import {Dispatch} from 'redux';
import {OrderTransaction} from '@redux/reducers/orders/orders.types';
import {WalletReducer} from '@redux/reducers/wallet/wallet.types';
import {actionType} from '@redux/actions/actions.types';


/**
 * used to buy some bitcoins units
 * @param payload
 */
export const buyOrder = (payload: OrderTransaction) => async (dispatch: Dispatch, getState) => {
  try {

    const wallet: WalletReducer = getState().wallet;
    const brl = (wallet.brl - payload.transaction_amount);
    const btc = (wallet.btc + payload.transaction_amount);
    const btc_unit = (wallet.btc_unit + payload.transaction_units);
    const walletPayload: WalletReducer = { brl, btc, btc_unit };

    dispatch({ type: actionType.SAVE_ORDER_TRANSACTION, payload });
    dispatch({ type: actionType.SAVE_WALLET_BALANCE, payload: walletPayload });

    return true;

  } catch (e) {
    return false;
  }
}; // buyOrder

/**
 * Used to sell some bitcoins units
 * @param payload
 */
export const sellOrder = (payload: OrderTransaction) => async (dispatch: Dispatch, getState) => {
  try {

    const wallet: WalletReducer = getState().wallet;
    const brl = (wallet.brl + payload.transaction_amount);
    const btc = (wallet.btc - payload.transaction_amount);
    const btc_unit = (wallet.btc_unit - payload.transaction_units);
    const walletPayload: WalletReducer = { brl, btc, btc_unit };


    dispatch({ type: actionType.SAVE_ORDER_TRANSACTION, payload });
    dispatch({ type: actionType.SAVE_WALLET_BALANCE, payload: walletPayload });

    return true;

  } catch (e) {
    return false;
  }
}; // sellOrder

/**
 * used to clear the transaction history and wallet balance
 */
export const clearHistory = () => async (dispatch: Dispatch) => {
  try {

    dispatch({ type: actionType.CLEAR_ORDERS_TRANSACTIONS });
    dispatch({ type: actionType.CLEAR_WALLET });

    return true;
  } catch (e) {
    return false;
  }
}; // clearHistory
