import React from 'react';
import PropTypes from 'prop-types';

// possibly refactor later to split up the "gallery photo card" and the "slider card"

const Card = ({
  url, index, activeIndex, clickShow,
}) => {
  const showCard = activeIndex === index ? 'showing' : '';
  return (
    <div className={`photo-card ${showCard}`} onClick={clickShow} role="button">
      <img src={url} data-index={index} alt="this is a description" />
    </div>
  );
};

Card.propTypes = {
  url: PropTypes.string,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number,
  clickShow: PropTypes.func,
};

Card.defaultProps = {
  url: '',
  activeIndex: null,
  clickShow: () => {},
};

export default Card;
