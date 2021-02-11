import { set, cloneDeep } from 'lodash';
import {Action} from '@redux/actions/actions.type';
import {OrdersReducer} from '@redux/reducers/orders/orders.types';

const initialState: OrdersReducer = {
  transactions: [],
};

export const ordersReducer = (state: OrdersReducer = initialState, action: Action) => {
  const newState = cloneDeep(state);

  switch (action.type) {
    // case actionType.SAVE_TOKEN:
    //   set(newState, ["token"], action.payload.token);
    //   return newState;

    default:
      return state;
  }
};
