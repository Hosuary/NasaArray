
import React from 'react';
import classnames from 'classnames';
import styles from './style.module.scss';
import {getFormatName} from "../../methods";
import Divider from "../Divider";

const AsteroidCard = ({ name, estimated_diameter, is_potentially_hazardous_asteroid, handleClick }) => {
  const {
    kilometers: {
      estimated_diameter_min,
      estimated_diameter_max
    }
  } = estimated_diameter;

  return (
    <div className={styles.AsteroidCard} onClick={handleClick}>
      <div className={styles.Name}>
        {getFormatName(name)}
      </div>
      <div className={styles.Radius}>
        <div className={classnames(styles.Radius, styles.Radius_small)}>
          <div className={styles.Label}>
            R<span className={styles.SmallText}>min</span> = {estimated_diameter_min.toFixed(3)} км
          </div>
        </div>
        <div className={classnames(styles.Label, styles.Label_absolute)}>
          R<span className={styles.SmallText}>max</span> = {estimated_diameter_max.toFixed(3)} км
        </div>
      </div>
      <Divider />
      <div className={styles.Info}>
        <div className={styles.Description}>
          Потенциально опасный для Земли:
          <strong>{is_potentially_hazardous_asteroid ? 'Да' : 'Нет'}</strong>
        </div>
      </div>
    </div>
  )
};

export default AsteroidCard;