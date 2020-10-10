import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';

import './index.css';
import PhotoModule from './PhotoModule.jsx';

ReactDOM.render(
  <React.StrictMode>
    <PhotoModule />
  </React.StrictMode>,
  document.getElementById('photo-module'),
);
