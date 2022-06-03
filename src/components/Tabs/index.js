
import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Charts from "../Charts";
import AsteroidsList from "../AsteroidsList";
import AsteroidsMap from "../AsteroidsMap";
import styles from './style.module.scss';


const Tabs = ({ asteroids }) => {
  const [tab, setTab] = React.useState('1');

  const handleChangeTab = (event, tab) => setTab(tab);

  return (
    <TabContext value={tab}>
      <div className={styles.TabList}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            variant="scrollable"
            onChange={handleChangeTab}
            aria-label="lab API tabs example"
          >
            <Tab label="Средние значения" value="1" />ч
            <Tab label="Относительные показатели" value="2" />
            <Tab label="Список астероидов" value="3" />
          </TabList>
        </Box>
      </div>
      <TabPanel value="1" classes={{ root: styles.TabPanel }}>
        <Charts asteroids={asteroids} />
      </TabPanel>
      <TabPanel value="2" classes={{ root: styles.TabPanel }}>
        <AsteroidsMap asteroids={asteroids} />
      </TabPanel>
      <TabPanel value="3" classes={{ root: styles.TabPanel }}>
        <AsteroidsList asteroids={asteroids} />
      </TabPanel>
    </TabContext>
  )
};

export default Tabs;