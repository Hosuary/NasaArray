
// Libraries
import React from 'react';
import { useParams } from 'react-router-dom';

// Components
import TemplatePage from "../../components/TemplatePage";

// Hooks
import useQuery from "../../hooks/useQuery";

// Constants
import { API_KEY } from "../../constants";

// Styles
import styles from './style.module.scss';


const Asteroid = () => {
  const { id } = useParams();
  const { loading, callQuery } = useQuery(
    `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`,
  );
  const [asteroid, setAsteroid] = React.useState(null);

  console.log('asteroid', asteroid)
  React.useEffect(() => {
    // callQuery().then(setAsteroid);
  }, []);

  const Asteroid = React.useCallback(() => {
    const {
      id,
      name,
      nasa_jpl_url,
      absolute_magnitude_h,
      is_potentially_hazardous_asteroid,
      is_sentry_object
    } = asteroid;

    const TYPES = {
      binary: 'binary'
    };

    const getBinaryValue = value => value ? "Да" : "Нет"

    const Info = ({ label, value, type, children }) => {
      return (
        <div className={styles.Info}>
          {label}: {type === TYPES.binary ? getBinaryValue(value) : value}
          {children}
        </div>
      )
    }

    return (
      <div className={styles.Asteroid}>
        <Info label="ID" value={id} />
        <Info label="Название" value={name} />
        <Info label="Фотография">
          <img src={nasa_jpl_url} />
        </Info>
        <Info label="Средняя звездная величина" value={absolute_magnitude_h} />
        <Info label="В данный момент ведется наблюдение" value={is_sentry_object} type='binary' />
        <Info label="Является потенциально опасным для земли" value={is_potentially_hazardous_asteroid ? "Да" : "Нет"}  type='binary' />
      </div>
    )
  }, [asteroid]);

  return (
    <TemplatePage
      loading={loading || !asteroid}
    >
      <Asteroid />
    </TemplatePage>
  )
}

export default Asteroid;