import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import './index.css';
import Eventform from './components/Eventform.js';
import EventList from './components/EventList.js';
import ClearLocalStorageButton from './components/ClearLocalStorage.js';
import Home from './pages/Home.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-event' element={<Eventform />} />
        <Route path='/explore-events' element={<EventList />} />
      </Routes>
         {/* <ClearLocalStorageButton /> */}
    </Router>
  );
}
export default App;
