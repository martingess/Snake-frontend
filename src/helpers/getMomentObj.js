import moment from 'moment'; 
export default (date) => {
  let finalDate = moment(date)
  if (!finalDate._isValid) finalDate = moment(parseInt(date, 10));
  return finalDate;
}
