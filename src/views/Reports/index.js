import React from 'react';
import TemplatePage from "../../components/TemplatePage";
import useReports from "../../hooks/useReports";
import styles from "./style.module.scss";
import EmptyCharts from "../../assets/EmptyCharts.png";
import Empty from "../../components/Empty";
import moment from "moment";
import { Link } from 'react-router-dom';
import Divider from "../../components/Divider";
import Image from "../../assets/ChartImage1.png";


const Reports = () => {
  const { reports } = useReports();

  const Grid = React.useCallback(() => (
    <div className={styles.Grid}>
      {Object.entries(reports)
        .sort(([_, valuesA], [__, valuesB]) => moment(valuesA.date).valueOf() - moment(valuesB.date).valueOf())
        .map(([id, { date, filters }]) => (
          <Link to={`/report/${id}`} className={styles.Report}>
            <div className={styles.Image}>
              <img src={Image} />
            </div>
            <div className={styles.Info}>
              Дата формирования отчета: <br /> {moment(date).format('DD MMM YYYY')}
            </div>
            <Divider />
            <div className={styles.Info}>
              Отчет за: <br /> {moment(filters.start_date).format('DD MMM YYYY')} - {moment(filters.end_date).format('DD MMM YYYY')}
            </div>
          </Link>
        ))
      }
    </div>
  ), [reports])

  const EmptyValues = React.useCallback(() => (
    <Empty
      image={() => <img src={EmptyCharts} />}
      label={() => <>Вы пока еще не создали отчеты. Их можно создать <Link to='/' className={styles.Link}>здесь</Link></>}
    />
  ), [reports])

  return (
    <TemplatePage>
      {Object.keys(reports).length > 0
        ? <Grid />
        : <EmptyValues />
      }
    </TemplatePage>
  )
};

export default Reports;