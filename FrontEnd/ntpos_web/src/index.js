import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './views/auth/Login';
import reportWebVitals from './reportWebVitals';
import './styles/global.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
reportWebVitals();
