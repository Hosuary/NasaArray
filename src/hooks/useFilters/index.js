
// Hooks
import {
  useDispatch,
  useSelector
} from "react-redux";


const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(store => store.filters);

  return {
    filters,
    changeFilters: updatedFilters => dispatch({ type: 'UPDATE_FILTERS', payload: updatedFilters })
  }
};

export default useFilters;