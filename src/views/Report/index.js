import Info from "../../components/Info";
import Tabs from "../../components/Tabs";
import React from "react";
import styles from "./style.module.scss";
import TemplatePage from "../../components/TemplatePage";
import useReport from "../../hooks/useReport";
import emptyChart from "../../assets/EmptyChart.png";
import Empty from "../../components/Empty";


const Report = () => {
  const id = window.location.pathname.split('/')[2];
  const { report } = useReport(id);

  const EmptyValues = React.useCallback(() => (
    <Empty
      image={() => <img src={emptyChart} className={styles.Image} />}
      label={() => <>График не был найден</>}
    />
  ), []);


  const Content = React.useCallback(() => {
    return report
      ? (
        <>
          <Info filters={report.filters} asteroids={report.data} />
          <Tabs asteroids={report.data} />
        </>
      )
      : <EmptyValues />
  }, [report]);

  return (
    <TemplatePage
      loading={false}
    >
      <Content />
    </TemplatePage>
  )
};

export default Report;