import React from 'react';
import styles from './style.module.scss';
import Loader from "../Loader";
import Wrapper from "../Wrapper";
import SidePanel from "../SidePanel";
import GetGraphs from "../GetGraphs";
import classnames from "classnames";
import useFullWidthSidePanel from "../../hooks/useFullWidthSidePanel";


const TemplatePage = ({
  children,
  loading ,
  modules = [],
  callbacks,
  loaderType = 'default',
  loaderData = []
}) => {
  const { isFullWidthPanel } = useFullWidthSidePanel();

  return (
    <div className={styles.Template}>
      <div className={classnames(styles.Row, !isFullWidthPanel && styles.Row_full)}>
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
}

export default TemplatePage;