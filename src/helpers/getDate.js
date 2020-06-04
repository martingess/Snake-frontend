import moment from 'moment';
export default (date) => {
  let stringDate = moment(date).format("MMMM Do YYYY");
  if (stringDate === "Invalid date") {
    stringDate = moment(parseInt(date, 10)).format("MMMM Do YYYY");
  }
  return stringDate
}