import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';

import './index.css';
import PhotosModule from './PhotosModule.jsx';

ReactDOM.render(
  <React.StrictMode>
    <PhotosModule />
  </React.StrictMode>,
  document.getElementById('photo-gallery'),
);
