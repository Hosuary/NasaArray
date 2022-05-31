
// Libraries
import React from 'react';

// Components
import Divider  from '../Divider';

// Styles
import styles from './style.module.scss';
import {getFormatDate} from "../../methods";


const Info = ({ filters, asteroids }) => {
  const { element_count: asteroids_count } = asteroids;
  const { start_date, end_date } = filters;

  return (
    <div className={styles.Info}>
      <Divider />
      {start_date && end_date && (
        <div className={styles.Description}>
          Графики за даты с {getFormatDate(start_date)} по {getFormatDate(end_date)}
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