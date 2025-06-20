// src/layouts/MainLayout.js

import React from 'react';
import Header from '../components/Header'; // Assicurati che il percorso sia corretto
import './MainLayout.css'; // Creeremo questo file CSS

function MainLayout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {children}
      </main>
      {/* Qui potresti aggiungere un Footer se necessario */}
    </div>
  );
}

export default MainLayout;