import React from 'react';
import moment from "moment";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import styles from "../../Charts/style.module.scss";
import {getFormatName} from "../../../methods";

const AverageCountOfDangerous = ({ near_earth_objects }) => {
  const chartData = React.useMemo(() => near_earth_objects
    .map(([date, values]) => ({
      date,
      countOfDangerous: values.reduce((countOfDangerous, { is_potentially_hazardous_asteroid }) => countOfDangerous + is_potentially_hazardous_asteroid, 0),
    }))
  , [near_earth_objects]);

  const CustomTooltip = React.useCallback(({ label }) => {
    if (label) {
      const currentDateData = Object.fromEntries(near_earth_objects)[label];
      const dangerousAsteroids = currentDateData.filter(is_potentially_hazardous_asteroid => is_potentially_hazardous_asteroid)

      return (
        <div className={styles.Tooltip}>
          <div className={styles.Tooltip__Title}>Опасные астероиды за {label}:</div>
          <div>
            {dangerousAsteroids.map(({ name, estimated_diameter }) => (
              <div className={styles.Tooltip__Item}>
                {getFormatName(name)} с минимальным диаметром {estimated_diameter.kilometers.estimated_diameter_min.toFixed(5)} км
              </div>
            ))}
          </div>
        </div>
      )
    }

    return <></>
  }, [near_earth_objects]);

  return (
    <ResponsiveContainer>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" name='Количество опасных астероидов' dataKey="countOfDangerous" stroke="tomato" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default AverageCountOfDangerous;