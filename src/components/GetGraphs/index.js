
// Libraries
import React from 'react';
import moment from 'moment';
import ruLocale from 'date-fns/locale/ru';

// Components
import { DatePicker } from '@mui/x-date-pickers';
import {Button, TextField} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CircularProgress from '@mui/material/CircularProgress';

// Hooks
import useFilters from "../../hooks/useFilters";

// Assets
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

// Styles
import styles from './style.module.scss';
import {LOADING_STATUSES} from "../../constants";


const GetGraphs = ({ loading, loaderData, callbacks }) => {
  const { filters, changeFilters } = useFilters();
  const [loadingPercent, setLoadingPercent] = React.useState(0);
  const oneChartPercent = 100 / loaderData.length;
  const countOfLoadedCharts = loaderData.filter(({ status }) => status === LOADING_STATUSES.success).length;

  const startDatePickerMinDate = new Date(moment(filters.end_date).subtract(2, 'year').format('YYYY-MM-DD'));
  const startDatePickerMaxDate = new Date(moment(filters.end_date).format('YYYY-MM-DD'));
  const endDatePickerMinDate = new Date(moment(filters.start_date).format('YYYY-MM-DD'));
  const endDatePickerMaxDate = new Date(moment().format('YYYY-MM-DD'));

  React.useEffect(() => {
    if (loading) {
      const percent = oneChartPercent * countOfLoadedCharts > 100 ? 100 : oneChartPercent * countOfLoadedCharts;
      setLoadingPercent(Math.ceil(percent));
    }
  }, [loading, loaderData]);

  const ConstructStage = React.useCallback(() => (
    <div className={styles.ConstructStage}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
        <div className={styles.DatePicker}>
          <DatePicker
            mask='__.__.____'
            label="Начальная дата"
            value={filters.start_date}
            minDate={startDatePickerMinDate}
            maxDate={startDatePickerMaxDate}
            onChange={(newValue) => changeFilters({ start_date: moment(newValue).format('YYYY-MM-DD') })}
            renderInput={(params) => <TextField {...params} />}
            disabled={loading}
          />
        </div>
        <div className={styles.DatePicker}>
          <DatePicker
            mask='__.__.____'
            label="Конечная дата"
            value={filters.end_date}
            minDate={endDatePickerMinDate}
            maxDate={endDatePickerMaxDate}
            onChange={(newValue) => changeFilters({ end_date: moment(newValue).format('YYYY-MM-DD') })}
            renderInput={(params) => <TextField {...params} />}
            disabled={loading}
          />
        </div>
        <Button
          variant="outlined"
          className={styles.StartButton}
          onClick={callbacks.downloadCharts}
        >
          Поcтроить графики
        </Button>
      </LocalizationProvider>
    </div>
  ), [filters, loading]);

  const DownloadStage = React.useCallback(() => (
    <div className={styles.Container}>
      <div className={styles.DownloadStage}>
        <div className={styles.Info}>
          <div className={styles.Label}>
            Загрузка...
          </div>
          <div className={styles.StageName}>
            Получено {countOfLoadedCharts} из {loaderData.length} блоков данных
          </div>
        </div>
        <div className={styles.Actions}>
          <div className={styles.Loader}>
            <div className={styles.LoadingPercent}>
              {loadingPercent}%
            </div>
            <CircularProgress variant="determinate" value={+loadingPercent} />
          </div>
          <Button
            variant='contained'
            className={styles.StopButton}
            startIcon={<StopCircleOutlinedIcon />}
            onClick={callbacks.stopDownloadCharts}
          >
            Остановить загрузку
          </Button>
        </div>
      </div>
    </div>
  ), [loading, loadingPercent])

  return loading ? <DownloadStage /> : <ConstructStage />;
};

export default GetGraphs;