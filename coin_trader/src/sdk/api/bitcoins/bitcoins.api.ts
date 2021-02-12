import client from '@sdk/client';
import endpoints from '@sdk/api/endpoints.api';
import {ApiResponse} from 'apisauce';
import {GetBitcoinDataResponse, GetBitcoinDataResponseParsed} from '@sdk/api/bitcoins/bitcoins.types';

export const get_bitcoin_data = async (): Promise<ApiResponse<GetBitcoinDataResponseParsed>> => {
  try {
    const get = await client.get<GetBitcoinDataResponse>(endpoints.get_bitcoin);

    if (get.ok) {
      const ticker = get?.data?.ticker;
      const data: GetBitcoinDataResponseParsed = {
        ticker: {
          high: parseFloat(ticker?.high),
          low: parseFloat(ticker?.low),
          vol: parseFloat(ticker?.vol),
          last: parseFloat(ticker?.last),
          buy: parseFloat(ticker?.buy),
          sell: parseFloat(ticker?.sell),
          open: parseFloat(ticker?.open),
          date: ticker.date,
        },
      };

      get.data = data as any;
    }

    return get as any;

  } catch (e) {
    return e;
  }
};
