import React from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import styles from "../../Charts/style.module.scss";
import {getFormatName} from "../../../methods";

const CountOfAsteroids = ({ near_earth_objects }) => {
  const chartData = React.useMemo(() => near_earth_objects
    .map(([date, values]) => ({
      date,
      average_magnitude_h: values.reduce((sumH, { absolute_magnitude_h }) => sumH + absolute_magnitude_h, 0) / values.length
    }))
  , [near_earth_objects]);

  const CustomTooltip = React.useCallback(({ label }) => {
    const fromEntriesNearEarthObjects = Object.fromEntries(near_earth_objects);

    return fromEntriesNearEarthObjects.hasOwnProperty(label)  && (
      <div className={styles.Tooltip}>
        <div className={styles.Tooltip__Title}>Амплитуды за {label}:</div>
        <div>
          {fromEntriesNearEarthObjects[label].map(({ id, name, absolute_magnitude_h }) => (
            <Link to={`/asteroid/${id}`} className={styles.Tooltip__Item}>
              {getFormatName(name)}: {absolute_magnitude_h}
            </Link>
          ))}
        </div>
      </div>
    )
  }, [near_earth_objects]);

  return (
    <ResponsiveContainer>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" name='Средняя абсолютная звездная величина' dataKey="average_magnitude_h" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default CountOfAsteroids;