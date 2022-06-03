
// Libraries
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ruLocale from 'date-fns/locale/ru';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// Views
import MainPage from "./views/MainPage";
import AboutProject from "./views/AboutProject";
import Reports from "./views/Reports";
import Report from "./views/Report";

// Redux
import store from './store';
import Asteroid from "./views/Asteroid";


function App() {
  return (
    <div className="App">
      <StoreProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
          <Router>
            <Routes>
              <Route path="/create_new_report" element={<MainPage />} />
              <Route path="/previous_reports" element={<Reports />} />
              <Route path="/about_project" element={<AboutProject />} />
              <Route path="/report/:id" element={<Report />} />
              <Route path="/" element={<MainPage />} />
            </Routes>
          </Router>
        </LocalizationProvider>
      </StoreProvider>
    </div>
  );
}

export default App;
