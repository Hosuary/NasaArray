
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

const reportReducer = (
  state = null,
  action
) => {
  switch (action.type) {
    case 'SET_REPORT': {
      return action.payload;
    }

    default:
      return state;
  }
}

const reducers = combineReducers({
  filters: filtersReducer,
  report: reportReducer
});

const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState
);

store.subscribe(() => {
  saveState({
    filters: store.getState().filters,
    report: store.getState().report,
  });
});

export default store;
