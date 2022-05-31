
// Libraries
import {
  useDispatch,
  useSelector
} from "react-redux";


const useReport = () => {
  const dispatch = useDispatch();
  const report = useSelector(store => store.report);

  return {
    report,
    setReport: report => dispatch({ type: 'SET_REPORT', payload: report })
  }
};

export default useReport;