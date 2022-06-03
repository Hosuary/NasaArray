
import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Charts from "../Charts";
import AsteroidsList from "../AsteroidsList";
import AsteroidsMap from "../AsteroidsMap";

const Tabs = ({ asteroids }) => {
  const [tab, setTab] = React.useState('1');

  const handleChangeTab = (event, tab) => setTab(tab);

  return (
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          variant="scrollable"
          onChange={handleChangeTab}
          aria-label="lab API tabs example"
        >
          <Tab label="Средние значения" value="1" />ч
          <Tab label="Относительные показатели" value="2" />
          <Tab label="Список астероидов" value="4" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <Charts asteroids={asteroids} />
      </TabPanel>
      <TabPanel value="2">
        <AsteroidsMap asteroids={asteroids} />
      </TabPanel>
      <TabPanel value="4">
        <AsteroidsList asteroids={asteroids} />
      </TabPanel>
    </TabContext>
  )
};

export default Tabs;