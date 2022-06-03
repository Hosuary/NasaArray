
// Libraries
import React from 'react';

// Styles
import styles from './style.module.scss';

import CountOfAsteroids from "../Chart/CountOfAsteroids";
import Chart from "../Chart";
import AverageEstimatedDiameter from "../Chart/AverageEstimatedDiameter";
import AverageCountOfDangerous from "../Chart/AverageCountOfDangerous";


const Charts = ({ asteroids }) => {
  const { near_earth_objects } = asteroids;

  return (
    <div className={styles.Charts}>
      <Chart title='Средняя звездная величина астероидов'>
        <CountOfAsteroids near_earth_objects={near_earth_objects} />
      </Chart>
      <Chart title='Средний потенциальный диаметр астероидов'>
        <AverageEstimatedDiameter near_earth_objects={near_earth_objects} />
      </Chart>
      <Chart title='Количество потенциально опасных астероидов'>
        <AverageCountOfDangerous near_earth_objects={near_earth_objects} />
      </Chart>
    </div>
  )
};

export default Charts;