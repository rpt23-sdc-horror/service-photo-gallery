import React from 'react';
import PropTypes from 'prop-types';

// possibly refactor later to split up the "gallery photo card" and the "slider card"

const PhotoCard = ({
  url, index, activeIndex, clickPhotoOpen,
}) => {
  const showCard = activeIndex === index ? 'showing' : '';
  return (
    <div className={`photo-card ${showCard}`} onClick={clickPhotoOpen} role="button">
      <img src={url} data-index={index} alt="this is a description" />
    </div>
  );
};

PhotoCard.propTypes = {
  url: PropTypes.string,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number,
  clickPhotoOpen: PropTypes.func,
};

PhotoCard.defaultProps = {
  url: '',
  activeIndex: 0,
  clickPhotoOpen: () => {},
};

export default PhotoCard;
