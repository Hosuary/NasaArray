import React from 'react';
import AsteroidCard from '../AsteroidCard';
import SearchInput from '../SearchInput';
import styles from './style.module.scss';
import InfiniteScroll from "react-infinite-scroll-component";
import {Button, Link, Modal} from "@mui/material";
import moment from "moment";
import Box from "@mui/material/Box";
import {getFormatName} from "../../methods";
import classnames from "classnames";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxWidth: '100%',
  maxHeight: '90%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderBottom: '10px solid #fff',
  boxShadow: 24,
  p: 4,
};

const ORBITS = {
  'Earth': 'Земля',
  'Mars': 'Марс'
}


const AsteroidsList = ({ asteroids }) => {
  const { near_earth_objects } = asteroids;
  const max_count_per_page = 2;

  const [searchString, setSearchString] = React.useState('');
  const [totalCount, setTotalCount] = React.useState(max_count_per_page);
  const [modalData, setModalData] = React.useState(null);

  const filteredNearEarthObjects = React.useMemo(() => {
    return near_earth_objects
      .map(([date, values]) => {
        const filteredValues = values.filter(({ name }) => name.includes(searchString || ''));
        return filteredValues.length > 0 ? [date, filteredValues] : null;
      })
      .filter(values => !!values)
  }, [near_earth_objects, searchString]);

  const Results = React.useCallback(() => {
    return (
      <InfiniteScroll
        dataLength={totalCount}
        next={() => setTotalCount(prev => prev + max_count_per_page > filteredNearEarthObjects.length
          ? filteredNearEarthObjects.length - prev
          : prev + max_count_per_page
        )}
        hasMore={totalCount < filteredNearEarthObjects.length}
      >
        {
          filteredNearEarthObjects.slice(0, totalCount).map(([date, values]) => (
            <div key={date} className={styles.Category}>
              <div className={styles.Date}>Астероиды за {date}:</div>
              <div className={styles.List}>
                {values.map(value => (
                  <AsteroidCard
                    key={value.id}
                    {...value}
                    handleClick={() => setModalData(value)}
                  />
                ))}
              </div>
            </div>
          ))
        }
      </InfiniteScroll>
    )
  }, [totalCount, filteredNearEarthObjects]);

  const EmptyResults = React.useCallback(() => (
    <div className={styles.EmptyResults}>
      Результатов по названию "{searchString}" не найдено!
    </div>
  ), [searchString]);

  const Stat = ({ type, label, value }) => (
    <div className={styles.Stat}>
      <div className={styles.Type}>
        {label}:
      </div>
      {type === 'link' ? (
        <a
          href={value}
          target="_blank"
          className={classnames(styles.Value, styles.Value_link)}
        >
          {value}
        </a>
      ) : (
        <div className={styles.Value}>
          {value}
        </div>
      )}
    </div>
  );

  console.log(modalData)

  return (
    <div>
      <SearchInput
        placeholder='Поиск астероида по названию'
        className={styles.SearchInput}
        onChange={setSearchString}
      />
      {filteredNearEarthObjects.length > 0
        ? <Results />
        : <EmptyResults />
      }
      {modalData && (
        <Modal
          open={!!modalData}
          onClose={() => setModalData(false)}
        >
          <Box sx={style}>
            <div className={styles.Name}>
              Астероид {getFormatName(modalData.name)}
            </div>
            <Stat
              label='Абсолютная звездная величина (h)'
              value={modalData.absolute_magnitude_h}
            />
            <Stat
              label='ID этого астероида в системе NASA'
              value={modalData.id}
            />
            <Stat
              label='Минимальный предположительный диаметр'
              value={`${modalData.estimated_diameter.kilometers.estimated_diameter_min} км`}
            />
            <Stat
              label='Максимальный предположительный диаметр'
              value={`${modalData.estimated_diameter.kilometers.estimated_diameter_max} км`}
            />
            <Stat
              label='Будет рядом с Землей (по мск)'
              value={moment(modalData.close_approach_data[0].close_approach_date_full).format('DD MMM YYYY hh:mm:ss')}
            />
            <Stat
              label='Максимально близкое расстояние до Земли (астрономическая величина)'
              value={`${modalData.close_approach_data[0].miss_distance.astronomical}`}
            />
            <Stat
              label='Максимально близкое расстояние до Земли (км)'
              value={`${Number(modalData.close_approach_data[0].miss_distance.kilometers).toFixed(3)} км`}
            />
            <Stat
              label='Максимальный предположительный диаметр'
              value={`${Number(modalData.estimated_diameter.kilometers.estimated_diameter_max).toFixed(5)} км`}
            />
            <Stat
              label='Потенциально опасный для Земли'
              value={modalData.is_potentially_hazardous_asteroid ? 'Да' : 'Нет'}
            />
            <Stat
              label='Наблюдаемый объект'
              value={modalData.is_sentry_object ? 'Да' : 'Нет'}
            />
            <Stat
              label='Вращается вокруг'
              value={ORBITS.hasOwnProperty(modalData.close_approach_data[0].orbiting_body)
                ? ORBITS[modalData.close_approach_data[0].orbiting_body]
                : modalData.close_approach_data[0].orbiting_body
            }
            />
            <Stat
              type='link'
              label='Ссылка на более подробную информацию'
              value={modalData.nasa_jpl_url}
            />
            <div className={styles.Actions}>
              <Button
                variant='contained'
                onClick={() => setModalData(false)}
              >
                Закрыть
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  )
};

export default AsteroidsList;