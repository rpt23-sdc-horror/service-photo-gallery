import React from 'react';
import PropTypes from 'prop-types';

const PhotoCard = ({ url, index, clickPhotoOpen }) => (
  <div className="photo-card" onClick={clickPhotoOpen}>
    <img src={url} data-index={index} alt="this is a description" />
  </div>
);

PhotoCard.propTypes = {
  url: PropTypes.string.isRequired,
};

export default PhotoCard;
