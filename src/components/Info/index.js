
// Libraries
import React from 'react';
import moment from "moment";

// Methods
import { getFormatDate } from "../../methods";

// Components
import Divider  from '../Divider';

// Styles
import styles from './style.module.scss';


const Info = ({ filters, asteroids }) => {
  const { element_count: asteroids_count } = asteroids;
  const { start_date, end_date } = filters;

  const countOfDaysBetweenDates = moment(end_date).diff(moment(start_date), 'days');

  const defaultLabel = `Графики за даты с ${start_date && getFormatDate(start_date)} по ${end_date && getFormatDate(end_date)}`;
  const oneDayLabel = `Графики за дату ${start_date && getFormatDate(start_date)}`;

  return (
    <div className={styles.Info}>
      {start_date && end_date && (
        <div className={styles.Description}>
          {countOfDaysBetweenDates === 0 ? oneDayLabel : defaultLabel}
        </div>
      )}
      {asteroids && (
        <div className={styles.Description}>
          Общее число астероидов: { asteroids_count }
        </div>
      )}
    </div>
  )
};

export default Info;