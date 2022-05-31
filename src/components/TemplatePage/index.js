import React from 'react';
import Filters from "../Filters";
import styles from './style.module.scss';
import Loader from "../Loader";
import Header from "../Header";
import Wrapper from "../Wrapper";
import ChainLoader from "../ChainLoader";


const TemplatePage = ({
  children,
  loading ,
  modules = [],
  loaderType = 'default',
  loaderData = []
}) => (
  <div className={styles.Template}>
    <Header loading={loading} />
    <Wrapper>
      {modules.includes('filters') && <Filters loading={loading} />}
      <div className={styles.Area}>
        {loading
          ? loaderType === 'default'
            ? <Loader />
            : <ChainLoader loaderData={loaderData} />
          : children
        }
      </div>
    </Wrapper>
  </div>
);

export default TemplatePage;