
import styles from './style.module.scss';
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className={styles.Header}>
      <Wrapper className={styles.Wrapper}>
        <Link to='/' className={styles.Logo}>
          <div>NasaArray</div>
        </Link>
        <div className={styles.Links}>
          <Link to='/' className={styles.Link}>
            Статистика
          </Link>
          <Link to='/about_project' className={styles.Link}>
            О проекте
          </Link>
        </div>
      </Wrapper>
    </div>
  )
}

export default Header;