// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Stili globali per l'html e il body
import App from './App';
// Se avevi reportWebVitals o setupTests, rimuovi i riferimenti qui se hai cancellato quei file.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
