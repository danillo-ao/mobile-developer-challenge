import 'intl';
import 'intl/locale-data/jsonp/pt-BR';


export const currencyFormat = (value: number): string => {
  const converted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  return converted.replace(/[^0-9,.]/gi, '');
};
