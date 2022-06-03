
import React from 'react';
import styles from './style.module.scss';
import { Link } from "react-router-dom";
import classnames from "classnames";
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import InsertChartOutlinedTwoTone from '@mui/icons-material/InsertChartOutlinedTwoTone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useFullWidthSidePanel from "../../hooks/useFullWidthSidePanel";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const TABS = [
  {
    id: 'create_new_report',
    Icon: AddchartOutlinedIcon,
    label: 'Создать новый отчет',
    link: '/'
  },
  {
    id: 'previous_reports',
    Icon: InsertChartOutlinedTwoTone,
    label: 'Предыдущие отчеты',
    link: '/previous_reports'
  },
  {
    id: 'settings',
    Icon: HelpOutlineIcon,
    label: 'О проекте',
    link: '/about_project'
  },
]

const SidePanel = () => {
  const currentLink = window.location.pathname;
  const foundIDByLink = TABS.find(({ link }) => currentLink === link)?.id;

  const [selectedItem, setSelectedItem] = React.useState(foundIDByLink);
  const { isFullWidthPanel, setIsFullWidthPanel } = useFullWidthSidePanel();

  const Logo = React.useCallback(() => (
    <div className={styles.Logo}>
      <Link to='/' className={styles.Link}>
        <div>NasaArray</div>
      </Link>
      <div className={styles.Sub}>
        The NASA OPEN API viewer charts tool
      </div>
    </div>
  ), []);

  const Tabs = React.useCallback(() => {
    return (
      <div className={styles.Tabs}>
        {
          TABS.map(({ id, Icon, label, link }) => (
            <Link
              to={link}
              className={classnames(styles.Tab, selectedItem === id && styles.Tab_selected)}
              onClick={() => setSelectedItem(id)}
            >
              <div className={styles.Icon}>
                <Icon />
              </div>
              <div className={styles.Label}>
                {label}
              </div>
            </Link>
          ))
        }
      </div>
    )
  }, [selectedItem]);

  const ChangerSize = () => {
    return (
      <div
        className={styles.ChangerSize}
        onClick={() => setIsFullWidthPanel(!isFullWidthPanel)}
      >
        {isFullWidthPanel ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
      </div>
    )
  };

  return (
    <div className={classnames(styles.SidePanel, !isFullWidthPanel && styles.SidePanel_mini)}>
      <Logo />
      <Tabs />
      <ChangerSize />
    </div>
  )
};

export default SidePanel;