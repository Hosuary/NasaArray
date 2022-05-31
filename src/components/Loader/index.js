
// Components
import { CircularProgress } from "@material-ui/core";

// Styles
import styles from './style.module.scss';


const Loader = ({ size }) => {
  return (
    <div className={styles.Loader}>
      <CircularProgress size={size} />
    </div>
  )
};

export default Loader;