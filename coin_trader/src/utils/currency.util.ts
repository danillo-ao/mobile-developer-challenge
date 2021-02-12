import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

/**
 * Return a parsed number in currency format
 * @param value
 */
export const currencyFormat = (value: number): string => {
  const converted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  return converted.replace(/[^0-9,.]/gi, '');
}; // currencyFormat


/**
 * Render the bitcoin in default patter
 * @param btc
 * @param fractionDigits
 */
export const parseBtc = (btc: number, fractionDigits: number = 2): string => {
  const splitBtc = btc.toString().split('.');
  let fixed:number = 2;

  if (!!splitBtc[1]){
    const remove = splitBtc[1].replace(/^0+/g, '');
    const zeros = splitBtc[1].replace(remove, '').length;
    fixed = (zeros + fractionDigits);
  }

  return btc.toFixed(fixed).toString();
}; // parseBtc
