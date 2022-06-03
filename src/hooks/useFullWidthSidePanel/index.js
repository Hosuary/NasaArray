
// Libraries
import {
  useDispatch,
  useSelector
} from "react-redux";


const useFullWidthSidePanel = () => {
  const dispatch = useDispatch();
  const isFullWidthPanel = useSelector(store => store.fullWidthPanel);

  return {
    isFullWidthPanel,
    setIsFullWidthPanel: value => dispatch({ type: 'SET_FULL_WIDTH_PANEL', payload: value })
  }
};

export default useFullWidthSidePanel;