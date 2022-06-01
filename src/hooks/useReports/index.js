
// Libraries
import {
  useDispatch,
  useSelector
} from "react-redux";


const useReports = () => {
  const dispatch = useDispatch();
  const reports = useSelector(store => store.reports);

  return {
    reports,
    addReport: report => dispatch({ type: 'ADD_REPORT', payload: report })
  }
};

export default useReports;