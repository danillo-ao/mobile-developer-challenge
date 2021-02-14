import {get_bitcoin_data} from '@sdk/api/bitcoins/bitcoins.api';

describe('Integração e consistência dos dados da api do mercado-bitcoin', () => {

  test('API encontrada - status 200', async () => {
    const get_data = await get_bitcoin_data();
    expect(get_data.status).toEqual(200);
    expect(get_data.ok).toBeTruthy();
  });

  test('Dados essenciais encontrados na API', async () => {
    const get_data = await get_bitcoin_data();

    expect(get_data.data).toBeDefined();
    expect(get_data.data.ticker).toBeDefined();
    expect(get_data.data.ticker.date).toBeDefined();
    expect(get_data.data.ticker.vol).toBeDefined();
    expect(get_data.data.ticker.last).toBeDefined();
  });

  test('Dados da API com a tipagem correta', async () => {
    const get_data = await get_bitcoin_data();

    expect(typeof get_data.data.ticker.last).toEqual('number');
    expect(typeof get_data.data.ticker.vol).toEqual('number');
    expect(typeof get_data.data.ticker.last).toEqual('number');
  });

});
