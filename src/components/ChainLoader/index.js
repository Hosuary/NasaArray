
import React from 'react';
import Loader from "../Loader"
import styles from './style.module.scss';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {LOADING_STATUSES} from "../../constants";


const ChainLoader = ({ loaderData }) => {
  const SuccessStatus = React.useCallback(() => (
    <span className={styles.Success}>
      <CheckCircleOutlineIcon />
    </span>
  ));

  const ErrorStatus = React.useCallback(() => (
    <span className={styles.Error}>
      <ErrorOutlineIcon />
    </span>
  ));

  const Status = React.useCallback(({ status }) => {
    return (
      <div className={styles.Status}>
        {status === LOADING_STATUSES.success
          ? <SuccessStatus />
          : status === LOADING_STATUSES.error
            ? <ErrorStatus />
            : <Loader size={20} />
        }
      </div>
    )
  }, [loaderData]);

  return (
    <div className={styles.ChainLoader}>
      {loaderData.map(({ status, label }) => (
        <div className={styles.Item}>
          <Status status={status} />
          <div className={styles.Label}>
            {label}
          </div>
        </div>
      ))}
    </div>
  )
};

export default ChainLoader;