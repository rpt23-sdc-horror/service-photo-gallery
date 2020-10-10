import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';

import './index.css';
import Component from './Component.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>,
  document.getElementById('photo-gallery'),
);
