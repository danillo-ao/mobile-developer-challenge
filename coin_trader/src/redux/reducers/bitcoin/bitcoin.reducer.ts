import {set, cloneDeep} from 'lodash';
import {Action, actionType} from '@redux/actions/actions.types';
import {BitcoinReducer} from '@redux/reducers/bitcoin/bitcoin.types';

const initialState: BitcoinReducer = {
  error: false,
  last: 0,
  vol: 0,
  date: Date.now(),
};

export const bitcoinReducer = (state: BitcoinReducer = initialState, action: Action) => {
  const newState = cloneDeep(state);
  let payload;

  switch (action.type) {
    case actionType.SAVE_BITCOINS_DATA:
      payload = { error: false, ...action.payload };
      return { ...newState, ...payload };

    case actionType.ERROR_BITCOINS_DATA:
      payload = { last: 0, vol: 0, error: true};
      return { ...newState, ...payload };

    default:
      return state;
  }
};
