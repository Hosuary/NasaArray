
// Libraries
import React from 'react';
import moment from 'moment';
import ruLocale from 'date-fns/locale/ru';

// Components
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Hooks
import useFilters from "../../hooks/useFilters";

// Styles
import styles from './style.module.scss';


const Filters = ({ loading }) => {
  const { filters, changeFilters } = useFilters();

  const startDatePickerMaxDate = new Date(moment(filters.end_date).format('YYYY-MM-DD'));
  const endDatePickerMinDate = new Date(moment(filters.start_date).format('YYYY-MM-DD'));
  const endDatePickerMaxDate = new Date(moment().format('YYYY-MM-DD'));

  return (
    <div className={styles.Filters}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
        <div className={styles.DatePicker}>
          <DatePicker
            mask='__.__.____'
            label="Начальная дата"
            value={filters.start_date}
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
      </LocalizationProvider>
    </div>
  )
};

export default Filters;