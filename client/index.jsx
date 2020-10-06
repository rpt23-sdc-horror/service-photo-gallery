import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';

import './index.css';
import App from './App.jsx';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('photo-gallery'),
);
