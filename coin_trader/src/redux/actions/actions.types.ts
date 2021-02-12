export type Action = {
  type: keyof typeof actionType;
  payload?: any,
};

export enum actionType {
  /** BITCOINS ACTIONS */
  SAVE_BITCOINS_DATA = 'SAVE_BITCOINS_DATA',
  ERROR_BITCOINS_DATA = 'ERROR_BITCOINS_DATA',
  /** WALLET ACTIONS */
  SAVE_BTC_BALANCE = 'SAVE_BTC_BALANCE',
  SAVE_BTC_UNITS = 'SAVE_BTC_UNITS',
  /** ORDERS ACTIONS */
}
