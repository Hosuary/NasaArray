
// Libraries
import {
  useDispatch,
  useSelector
} from "react-redux";


const useReport = (id) => {
  const dispatch = useDispatch();
  const report = useSelector(store => store.reports.hasOwnProperty(id) ? store.reports[id] : null);

  return {
    report,
    setReport: report => dispatch({ type: 'SET_REPORT', payload: report })
  }
};

export default useReport;