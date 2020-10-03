import React from 'react';
import PropTypes from 'prop-types';

const Photo = ({ url }) => (
  <div className="photo-wrapper">
    <img src={url} alt="this is a description" />
  </div>
);

Photo.propTypes = {
  url: PropTypes.string.isRequired
}

export default Photo;
