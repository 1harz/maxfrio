import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/hero.css';
import './styles/benefits.css';
import './styles/parts.css';
import './styles/responsive.css';

// Suprime warning de depreciação do THREE.Clock chamado internamente pelo @react-three/fiber
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
    return;
  }
  originalWarn(...args);
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
