// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import WhyProject from './pages/WhyProject';
// Importa qui i futuri componenti degli strumenti

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">Chi Siamo</Link></li>
          <li><Link to="/why-project">Perché questo progetto</Link></li>
          {/* Aggiungi qui i link per gli strumenti quando saranno pronti */}
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/why-project" element={<WhyProject />} />
          {/* Aggiungi qui le rotte per gli strumenti */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;