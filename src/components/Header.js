// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Creeremo questo file CSS

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">Studenti Lavoratori</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">Chi Siamo</Link></li>
          <li><Link to="/why-project">Perché questo progetto</Link></li>
          <li><Link to="/schedule">Orario Settimanale</Link></li>
          <li><Link to="/calendar">Date Importanti</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;