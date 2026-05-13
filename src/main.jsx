import React from 'react';
import ReactDOM from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <AnimatePresence mode="wait">
          <App />
        </AnimatePresence>
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>,
);
