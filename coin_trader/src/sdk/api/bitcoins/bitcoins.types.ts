export type AvailableCoins = 'BTC' | 'BCH' | 'ETH'; // possible coins returned by mercado bitcoin API

export type GetBitcoinDataResponse = {
  ticker: {
    high: string;
    low: string;
    vol: string;
    last: string;
    buy: string;
    sell: string;
    open: string;
    date: number;
  }
}
export type GetBitcoinDataResponseParsed = {
  ticker: {
    high: number;
    low: number;
    vol: number;
    last: number;
    buy: number;
    sell: number;
    open: number;
    date: number;
  }
}
