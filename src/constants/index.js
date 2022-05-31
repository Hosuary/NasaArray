import moment from "moment";

export const API_KEY = '63vnDhkQEUbXd8caG0n3wToxRSB01AuXFuUZ9zPv';

export const DEFAULT_FILTERS = {
  start_date: moment().subtract(7, 'day').format('YYYY-MM-DD'),
  end_date: moment().format('YYYY-MM-DD'),
};

export const LOADING_STATUSES = {
  not_loading: 'not_loading',
  success: 'success',
  loading: 'loading',
  error: 'error'
}