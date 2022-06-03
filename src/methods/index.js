
// Libraries
import moment from "moment";
import 'moment/locale/ru';


export const getFormatName = name => name.replace(/[{()}]/g, '');

export const getFormatDate = date => moment(date).locale('ru').format('DD MMM YYYY');

export const getPartsOfDatesObjects = (start_date, end_date) => {
  const momentObjStartDate = moment(start_date);
  const momentObjEndDate = moment(end_date);
  const countOfDaysBetweenDates = momentObjEndDate.diff(momentObjStartDate, 'days');

  if (countOfDaysBetweenDates > 7) {
    const countOfRanges = Math.ceil(countOfDaysBetweenDates / 7);
    return [...new Array(countOfRanges)].map((_, i) => {
      const startDate = momentObjStartDate.clone().add(7 * i, 'days');
      const endDate = startDate.clone().add(
        countOfDaysBetweenDates < 6 * (i + 1)
          ? 6 * (i + 1) - countOfDaysBetweenDates - 1
          : 6
      , 'days');

      const formattedStartDate = startDate.format('DD MMM YYYY');
      const formattedEndDate = endDate.format('DD MMM YYYY');

      return {
        id: i + 1,
        label: `${formattedStartDate} - ${formattedEndDate}`,
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD')
      }
    });
  }

  const defaultLabel = `${moment(start_date).format('DD MMM YYYY')} - ${moment(end_date).format('DD MMM YYYY')}`;
  const oneDayLabel = `${moment(start_date).format('DD MMM YYYY')}`

  return [
    {
      id: 1,
      label: countOfDaysBetweenDates === 0 ? oneDayLabel : defaultLabel,
      start_date,
      end_date
    }
  ]
};