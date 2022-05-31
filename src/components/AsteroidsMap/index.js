import React from 'react'
import Chart from "../Chart";
import {ScatterChart} from "recharts";
import {CartesianGrid, Legend, Scatter, Tooltip, XAxis, YAxis, ZAxis} from "recharts";
import styles from "../Charts/style.module.scss";
import moment from "moment";
import {getFormatName} from "../../methods";

const AsteroidsMap = ({ asteroids }) => {
  const { near_earth_objects } = asteroids;

  const chartData = React.useMemo(() => {
    return near_earth_objects.reduce((reducer, [date, values]) => {
      console.log('values', values)
      return {
        ...reducer,
        [date]: values.map(({
          estimated_diameter: {
            kilometers: {
              estimated_diameter_min,
              estimated_diameter_max
            }
          },
          close_approach_data
        }) => ({
          range: (estimated_diameter_max + estimated_diameter_min) / 2,
          averageRadius: +close_approach_data[0].miss_distance.astronomical
        }))
      }
    }, {});
  }, [near_earth_objects]);

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
    <div>
      {Object.entries(chartData).map(([date, values]) => (
        <Chart title={`Расстояние до астероидов относительно Земли (астрономическая величина) и радиус (в км) за ${date}`}>
          <ScatterChart
            width={730}
            height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" name="diameter" unit=" км" />
            <YAxis dataKey="averageRadius" name="range" unit=" астр" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
            <Scatter name="Астероид" data={values} fill="#8884d8" />
          </ScatterChart>
        </Chart>
      ))}
    </div>
  )
};

export default AsteroidsMap;