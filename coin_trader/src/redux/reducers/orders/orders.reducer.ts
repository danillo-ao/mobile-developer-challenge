import {cloneDeep} from 'lodash';
import {Action, actionType} from '@redux/actions/actions.types';
import {OrdersReducer} from '@redux/reducers/orders/orders.types';

const initialState: OrdersReducer = {
  transactions: [],
};

export const ordersReducer = (state: OrdersReducer = initialState, action: Action) => {
  const newState = cloneDeep(state);

  switch (action.type) {

    case actionType.SAVE_ORDER_TRANSACTION:
      newState.transactions.push(action.payload);
      return newState;

    case actionType.CLEAR_ORDERS_TRANSACTIONS:
      return initialState;

    default:
      return state;
  }
};
