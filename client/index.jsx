import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';

import { BrowserRouter as Router } from 'react-router-dom';

import PhotoModuleWithRouter from './PhotoModule.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PhotoModuleWithRouter />
    </Router>
  </React.StrictMode>,
  document.getElementById('photo-module'),
);
