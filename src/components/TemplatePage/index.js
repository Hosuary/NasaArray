import React from 'react';
import styles from './style.module.scss';
import Loader from "../Loader";
import Wrapper from "../Wrapper";
import ChainLoader from "../ChainLoader";
import SidePanel from "../SidePanel";
import GetGraphs from "../GetGraphs";


const TemplatePage = ({
  children,
  loading ,
  modules = [],
  callbacks,
  loaderType = 'default',
  loaderData = []
}) => (
  <div className={styles.Template}>
    <div className={styles.Row}>
      <SidePanel />
      <Wrapper>
        {modules.includes('get-graph') && (
          <GetGraphs
            loading={loading}
            loaderData={loaderData}
            callbacks={callbacks.graphCallbacks}
          />
        )}
        <div className={styles.Area}>
          {loading
            ? loaderType === 'default' && <Loader />
            : children
          }
        </div>
      </Wrapper>
    </div>
  </div>
);

export default TemplatePage;