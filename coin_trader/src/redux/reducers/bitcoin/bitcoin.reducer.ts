import { set, cloneDeep } from 'lodash';
import {Action} from '@redux/actions/actions.type';
import {BitcoinReducer} from '@redux/reducers/bitcoin/bitcoin.types';

const initialState: BitcoinReducer = {
  last: 0,
  vol: 0,
  date: Date.now(),
};

export const bitcoinReducer = (state: BitcoinReducer = initialState, action: Action) => {
  const newState = cloneDeep(state);

  switch (action.type) {
    // case actionType.SAVE_TOKEN:
    //   set(newState, ["token"], action.payload.token);
    //   return newState;

    default:
      return state;
  }
};
