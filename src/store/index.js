
// Libraries
import { combineReducers, createStore } from 'redux';

// Reducers
import { loadState, saveState } from './localStorage';
import { DEFAULT_FILTERS } from "../constants";


// настройки, которые у пользователя в фиолетовой шапке (все остальные)
const filtersReducer = (
  state = DEFAULT_FILTERS,
  action
) => {
  switch (action.type) {
    case 'UPDATE_FILTERS': {
      return { ...state, ...action.payload };
    }

    case 'RETURN_TO_DEFAULT_FILTERS': {
      return DEFAULT_FILTERS;
    }

    default:
      return state;
  }
};

const reportsReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case 'ADD_REPORT': {
      return {
        ...state,
        [action.payload.id]: {
          date: action.payload.date,
          filters: action.payload.filters,
          data: action.payload.data
        }
      };
    }

    default:
      return state;
  }
}

const reducers = combineReducers({
  filters: filtersReducer,
  reports: reportsReducer
});

const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState
);

store.subscribe(() => {
  saveState({
    filters: store.getState().filters,
    reports: store.getState().reports,
  });
});

export default store;
