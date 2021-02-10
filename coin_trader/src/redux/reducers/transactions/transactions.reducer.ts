import { set, cloneDeep } from 'lodash';
import {TransactionReducer} from '@redux/reducers/transactions/transactions.types';
import {Action} from '@redux/actions/actions.type';

const initialState: TransactionReducer = {};

export const transactionsReducer = (state: TransactionReducer = initialState, action: Action) => {
  const newState = cloneDeep(state);

  switch (action.type) {
    // case actionType.SAVE_TOKEN:
    //   set(newState, ["token"], action.payload.token);
    //   return newState;

    default:
      return state;
  }
};
