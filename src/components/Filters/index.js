
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


const Filters = () => {
  const { filters, changeFilters } = useFilters();

  return (
    <div className={styles.Filters}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale}>
        <div className={styles.DatePicker}>
          <DatePicker
            mask='__.__.____'
            label="Начальная дата"
            value={filters.start_date}
            onChange={(newValue) => changeFilters({ start_date: moment(newValue).format('YYYY-MM-DD') })}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className={styles.DatePicker}>
          <DatePicker
            mask='__.__.____'
            label="Конечная дата"
            value={filters.end_date}
            onChange={(newValue) => changeFilters({ end_date: moment(newValue).format('YYYY-MM-DD') })}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      </LocalizationProvider>
    </div>
  )
};

export default Filters;