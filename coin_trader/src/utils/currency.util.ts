import 'intl';
import 'intl/locale-data/jsonp/pt-BR';


export const currencyFormat = (value: number): string => {
  const converted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  return converted.replace(/[^0-9,.]/gi, '');
};

/**
 * Render the bitcoin in default patter
 * @param btc
 * @param fractionDigits
 */
export const currencyBtc = (btc: number, fractionDigits: number = 2): string => {
  const splitBtc = btc.toString().split('.');
  let fixed:number = 2;

  if (!!splitBtc[1]){
    const remove = splitBtc[1].replace(/^0+/g, '');
    const zeros = splitBtc[1].replace(remove, '').length;
    fixed = (zeros + fractionDigits);
  }

  return btc.toFixed(fixed).toString();
}; // currencyBtc
