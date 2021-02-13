import {create} from 'apisauce';

const client = create({
  baseURL: 'https://www.mercadobitcoin.net/api',
  headers: { Accept: 'application/json' },
});

export default client;
