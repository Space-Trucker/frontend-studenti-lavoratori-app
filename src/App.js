// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; // Importa il layout
import Home from './pages/Home';
import About from './pages/About';
import WhyProject from './pages/WhyProject';
import ScheduleTablePage from './pages/ScheduleTablePage'; // Importa lo strumento orario
import CalendarPage from './pages/CalendarPage';         // Importa lo strumento calendario
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import './App.css'; // Per stili globali dell'App
// Non è più necessario importare Link in App.js perché è nel Header

function App() {
  return (
    <Router>
      <MainLayout> {/* Avvolgi tutte le rotte nel MainLayout */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-project" element={<WhyProject />} />
          <Route path="/schedule" element={<ScheduleTablePage />} /> {/* Nuova rotta per l'orario */}
          <Route path="/calendar" element={<CalendarPage />} />     {/* Nuova rotta per il calendario */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Qui andranno le rotte future */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;