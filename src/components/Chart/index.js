
import styles from './style.module.scss'
import {ResponsiveContainer} from "recharts";

const Chart = ({ title, children }) => {
  return (
    <div className={styles.Chart}>
      <div className={styles.Title}>
        {title}
      </div>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export default Chart;