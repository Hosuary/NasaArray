
// Libraries
import React, { useState } from 'react';
import moment from "moment";
import { Button } from "@mui/material";

// Components
import Info from "../../components/Info";
import Tabs from "../../components/Tabs";
import TemplatePage from "../../components/TemplatePage";

// Hooks
import useFilters from "../../hooks/useFilters";
import useReport from "../../hooks/useReport";
import useChainQuery from "../../hooks/useChainQuery";

// Methods
import { getFormatDate, getPartsOfDatesObjects } from "../../methods";

// Constants
import { API_KEY, LOADING_STATUSES } from "../../constants";

// Styles
import styles from './style.module.scss';


const MainPage = () => {
  const { filters } = useFilters();
  const { report, setReport } = useReport(null);
  const [emptyData, setEmptyData] = useState(false);

  const chainQueryData = getPartsOfDatesObjects(filters.start_date, filters.end_date);
  const { loadings, callQueries } = useChainQuery();

  const fetchAsteroids = () => Promise.all(callQueries(
    chainQueryData.map(({ id, label, start_date, end_date, status }) => ({
      id,
      queryUrl: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`,
      anotherData: {
        start_date,
        end_date,
        label
      }
    }))
  )).then((data) => {
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

    if (mergedData) {
      setEmptyData(false);

      setReport(mergedData);
    } else {
      setEmptyData(true);
    }
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
          {report && (
            <>
              <Info filters={filters} asteroids={report} />
              <Tabs asteroids={report} />
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