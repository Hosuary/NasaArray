import React from 'react'
import Chart from "../Chart";
import {ScatterChart} from "recharts";
import {CartesianGrid, Legend, Scatter, Tooltip, XAxis, YAxis, Dot} from "recharts";
import styles from "../Charts/style.module.scss";
import {getFormatName} from "../../methods";
import InfiniteScroll from "react-infinite-scroll-component";

const AsteroidsMap = ({ asteroids }) => {
  const { near_earth_objects } = asteroids;

  const max_count_per_page = 5;
  const [totalCount, setTotalCount] = React.useState(max_count_per_page);

  const chartData = React.useMemo(() => {
    return near_earth_objects.reduce((reducer, [date, values]) => {
      return {
        ...reducer,
        [date]: values.map(({
          id,
          name,
          estimated_diameter: {
            kilometers: {
              estimated_diameter_min,
              estimated_diameter_max
            }
          },
          close_approach_data
        }) => ({
          id,
          name,
          range: (estimated_diameter_max + estimated_diameter_min) / 2,
          averageRadius: +close_approach_data[0].miss_distance.astronomical
        }))
      }
    }, {});
  }, [near_earth_objects]);

  const CustomTooltip = React.useCallback(props => {
    if (props.active) {
      const id = props.payload[0].payload.id;
      const date = props.date;

      const fromEntriesNearEarthObjects = Object.fromEntries(near_earth_objects);

      if (fromEntriesNearEarthObjects.hasOwnProperty(date) && id) {
        const {
          name,
          close_approach_data,
          estimated_diameter
        } = fromEntriesNearEarthObjects[date].find(asteroid => asteroid.id === id);

        return (
          <div className={styles.Tooltip}>
            <div className={styles.Tooltip__Title}>Астероид {getFormatName(name)}</div>
            <div className={styles.Tooltip__Item}>
              Ожидаемое расстояние до земли: {+close_approach_data[0].miss_distance.astronomical} астрономических единиц
            </div>
            <div className={styles.Tooltip__Item}>
              Ожидаемый минимальный радиус: {estimated_diameter.kilometers.estimated_diameter_min} километров
            </div>
            <div className={styles.Tooltip__Item}>
              Ожидаемый максимальный радиус: {estimated_diameter.kilometers.estimated_diameter_max} километров
            </div>
          </div>
        )
      }
    }

    return <></>;
  }, [near_earth_objects]);

  const CustomizedShape = (props) => {
    const {cx, cy, fill, tooltipPayload} = props;

    const name = tooltipPayload[0].payload.name;

    return (
      <g>
        <Dot cx={cx} cy={cy} r={5} fill={fill} />
        <g transform={`translate(${cx},${cy})`}>
          <text x={10} y={0} dy={4} textAnchor="left">{getFormatName(name)}</text>
        </g>
      </g>
    );
  };

  const entriedChartData = Object.entries(chartData);

  return (
    <InfiniteScroll
      dataLength={totalCount}
      next={() => setTotalCount(prev => prev + max_count_per_page > entriedChartData.length
        ? entriedChartData.length - prev
        : prev + max_count_per_page
      )}
      hasMore={totalCount < entriedChartData.length}
    >
      {entriedChartData.slice(0, totalCount).map(([date, values]) => (
        <Chart key={date} title={`Расстояние до астероидов относительно Земли (астрономическая величина) и радиус (в км) за ${date}`}>
          <ScatterChart
            width={730}
            height={250}
            margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" name="diameter" unit=" астр" />
            <YAxis dataKey="averageRadius" name="range" unit=" км" />
            <Legend />
            <Tooltip name="id" content={props => <CustomTooltip {...props} date={date} />} />
            <Scatter
              name="Астероиды"
              date={date}
              data={values}
              fill="#8884d8"
              shape={<CustomizedShape />}
            />
          </ScatterChart>
        </Chart>
      ))}
    </InfiniteScroll>
  )
};

export default AsteroidsMap;