
import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import {getFormatName} from "../../methods";
import Divider from "../Divider";

const AsteroidCard = ({ id, name, estimated_diameter, is_potentially_hazardous_asteroid }) => {
  const {
    kilometers: {
      estimated_diameter_min,
      estimated_diameter_max
    }
  } = estimated_diameter;

  return (
    <Link to={`/asteroid/${id}`} className={styles.AsteroidCard}>
      <div className={styles.Name}>
        {getFormatName(name)}
      </div>
      <div className={styles.Radius}>
        <div className={classnames(styles.Radius, styles.Radius_small)}>
          <div className={styles.Label}>
            R<span className={styles.SmallText}>min</span> = {estimated_diameter_min.toFixed(5)} км
          </div>
        </div>
        <div className={classnames(styles.Label, styles.Label_absolute)}>
          R<span className={styles.SmallText}>max</span> = {estimated_diameter_max.toFixed(5)} км
        </div>
      </div>
      <Divider />
      <div className={styles.Info}>
        <div className={styles.Description}>
          Потенциально опасный для Земли: {is_potentially_hazardous_asteroid ? 'Да' : 'Нет'}
        </div>
      </div>
    </Link>
  )
};

export default AsteroidCard;