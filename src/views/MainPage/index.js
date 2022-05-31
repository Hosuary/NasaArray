
// Libraries
import React, { useEffect, useState } from 'react';

// Components
import Filters from "../../components/Filters";
import Info from "../../components/Info";
import Tabs from "../../components/Tabs";
import Loader from "../../components/Loader";
import TemplatePage from "../../components/TemplatePage";

// Hooks
import useQuery from "../../hooks/useQuery";
import useFilters from "../../hooks/useFilters";

// Constants
import {API_KEY, LOADING_STATUSES} from "../../constants";

// Styles
import styles from './style.module.scss';
import {Button} from "@mui/material";
import moment from "moment";
import {getFormatDate, getPartsOfDatesObjects} from "../../methods";
import {useChainQuery} from "../../hooks/useChainQuery";


const MainPage = () => {
  const { filters } = useFilters();
  const [asteroids, setAsteroids] = useState(null);
  const [emptyData, setEmptyData] = useState(false);

  const chainQueryData = getPartsOfDatesObjects(filters.start_date, filters.end_date);
  const { loadings, callQueries } = useChainQuery(
    chainQueryData.map(({ id, label, start_date, end_date, status }) => ({
      id,
      queryUrl: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`,
      anotherData: {
        start_date,
        end_date,
        label
      }
    }))
  );

  const fetchAsteroids = () => Promise.all(callQueries()).then((data) => {
    const mergedData = data.reduce((reducer, { element_count, near_earth_objects }) => ({
      element_count: reducer.element_count + element_count,
      near_earth_objects: [
        ...reducer.near_earth_objects,
        ...Object.entries(near_earth_objects)
          .sort(([dateA], [dateB]) => moment(dateA).valueOf() - moment(dateB).valueOf())
          .map(([date, values]) => [getFormatDate(date), values])
      ]
    }), {
      element_count: 0,
      near_earth_objects: []
    });

    setAsteroids(() => {
      if (mergedData) {
        setEmptyData(false);

        return mergedData;
      } else {
        setEmptyData(true);
      }

      return null;
    })
  });

  const Empty = () => {
    return (
      <div className={styles.Empty}>Данных не найдено</div>
    )
  };

  const Content = () => {
    return !emptyData
      ? (
        <>
          {asteroids && (
            <>
              <Info filters={filters} asteroids={asteroids} />
              <Tabs asteroids={asteroids} />
            </>
          )}
        </>
      )
      : <Empty />
  };

  const allStatusesIsSuccess = loadings.every(({ status }) => status === LOADING_STATUSES.success);
  const isNotLoaded = loadings.every(({ status }) => status === LOADING_STATUSES.not_loading);

  return (
    <TemplatePage
      loading={!allStatusesIsSuccess && !isNotLoaded}
      loaderType='chain'
      loaderData={loadings}
      modules={['filters']}
    >
      <Button
        variant="outlined"
        onClick={fetchAsteroids}
        className={styles.Button}
      >
        Поcтроить графики
      </Button>
      <Content />
    </TemplatePage>
  )
};

export default MainPage;