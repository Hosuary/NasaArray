import React from 'react';
import moment from "moment";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import styles from "../../Charts/style.module.scss";
import {getFormatName} from "../../../methods";

const AverageEstimatedDiameter = ({ near_earth_objects }) => {
  const chartData = React.useMemo(() => near_earth_objects
    .map(([date, values]) => ({
      date,
      estimated_diameter_min: values.reduce((sumDiameter, { estimated_diameter }) => sumDiameter + estimated_diameter.kilometers.estimated_diameter_min, 0) / values.length,
      estimated_diameter_max: values.reduce((sumDiameter, { estimated_diameter }) => sumDiameter + estimated_diameter.kilometers.estimated_diameter_max, 0) / values.length
    }))
  , [near_earth_objects]);


  const CustomTooltip = React.useCallback(({ label }) => {
    const fromEntriesNearEarthObjects = Object.fromEntries(near_earth_objects);

    return fromEntriesNearEarthObjects.hasOwnProperty(label) && (
      <div className={styles.Tooltip}>
        <div className={styles.Tooltip__Title}>Минимальный средний диаметр астероидов за {label}:</div>
        <div>
          {fromEntriesNearEarthObjects[label].map(({ name, estimated_diameter }) => (
            <div className={styles.Tooltip__Item}>
              {getFormatName(name)}: {estimated_diameter.kilometers.estimated_diameter_min} километров
            </div>
          ))}
        </div>
        <div className={styles.Tooltip__Title}>Максимальный средний диаметр астероидов за {label}:</div>
        <div>
          {fromEntriesNearEarthObjects[label].map(({ name, estimated_diameter }) => (
            <div className={styles.Tooltip__Item}>
              {getFormatName(name)}: {estimated_diameter.kilometers.estimated_diameter_min} километров
            </div>
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
        <Line type="monotone" name='Минимальный средний потенциальный диаметр' dataKey="estimated_diameter_min" stroke="green" activeDot={{ r: 8 }} />
        <Line type="monotone" name='Максимальный средний потенциальный диаметр' dataKey="estimated_diameter_max" stroke="red" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default AverageEstimatedDiameter;