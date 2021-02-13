/**
 * Return a string date in format 'dd/mm - HH:mm'
 * @param date -
 * @param isEpoch
 */
export const getDate = (date: number, isEpoch?: boolean): string => {
  const multiply = (isEpoch ? 1000 : 1);
  const _date = new Date(date * multiply);

  const day = _date.getDate();
  const month = _date.getMonth() + 1;
  const year = _date.getFullYear();
  const hours = _date.getHours();
  const minutes = _date.getMinutes();
  const fixedMonth = month < 10 ? `0${month}` : month;
  const fixedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day}/${fixedMonth}/${year} - ${hours}h${fixedMinutes}`;
}; // getDate
