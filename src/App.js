
// Libraries
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ruLocale from 'date-fns/locale/ru';

// Views
import MainPage from "./views/MainPage";
import Asteroid from "./views/Asteroid";
import AboutProject from "./views/AboutProject";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// Redux
import store from './store';

// Styles
import './App.css';


function App() {
  return (
    <div className="App">
      <StoreProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
          <Router>
            <Routes>
              <Route path="/asteroid/:id" element={<Asteroid />} />
              <Route path="/about_project" element={<AboutProject />} />
              <Route path="/" element={<MainPage />} />
            </Routes>
          </Router>
        </LocalizationProvider>
      </StoreProvider>
    </div>
  );
}

export default App;
