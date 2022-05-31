import React from 'react';
import AsteroidCard from '../AsteroidCard';
import SearchInput from '../SearchInput';
import styles from './style.module.scss';
import useQuery from "../../hooks/useQuery";
import {API_KEY} from "../../constants";
import {getFormatDate} from "../../methods";

const AsteroidsList = ({ asteroids }) => {
  const { near_earth_objects } = asteroids;

  const [searchString, setSearchString] = React.useState('');

  const filteredNearEarthObjects = React.useMemo(() => {
    return near_earth_objects
      .map(([date, values]) => {
        const filteredValues = values.filter(({ name }) => name.includes(searchString || ''));
        return filteredValues.length > 0 ? [date, filteredValues] : null;
      })
      .filter(values => !!values)
  }, [near_earth_objects, searchString]);

  const Results = React.useCallback(() => filteredNearEarthObjects.map(([date, values]) => (
    <div className={styles.Category}>
      <div className={styles.Date}>Астероиды за {date}:</div>
      <div className={styles.List}>
        {values.map(({ id, is_potentially_hazardous_asteroid, name, estimated_diameter }) => (
          <AsteroidCard
            id={id}
            name={name}
            estimated_diameter={estimated_diameter}
            is_potentially_hazardous_asteroid={is_potentially_hazardous_asteroid}
          />
        ))}
      </div>
    </div>
  )), [filteredNearEarthObjects]);

  const EmptyResults = React.useCallback(() => (
    <div className={styles.EmptyResults}>
      Результатов по названию "{searchString}" не найдено!
    </div>
  ), [searchString])

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
    </div>
  )
};

export default AsteroidsList;