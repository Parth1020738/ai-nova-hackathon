// main.jsx
// ============================================================
// Vite entry point — mounts the React App into the DOM
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css'; // Load global styles first

// Mount the App into the #root element defined in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
