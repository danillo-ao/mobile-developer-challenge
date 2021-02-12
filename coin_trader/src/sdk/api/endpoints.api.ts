import {AvailableCoins} from '@sdk/api/bitcoins/bitcoins.types';

const endpoints = {
  get_bitcoin: '/BTC/ticker/',
  get_coin: (coin: AvailableCoins = 'BTC') => `/${coin}/ticker/`,
};

export default endpoints;
