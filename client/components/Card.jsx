import React from 'react';
import PropTypes from 'prop-types';

// possibly refactor later to split up the "gallery photo card" and the "slider card"

const Card = ({
  url, index, active, clickShowModal,
}) => (
  <div className={`photo-card ${active ? 'active' : ''}`} onClick={clickShowModal} role="button">
    <img src={url} data-index={index} alt="this is a description" />
  </div>
);

Card.propTypes = {
  url: PropTypes.string,
  index: PropTypes.number,
  active: PropTypes.bool,
  clickShowModal: PropTypes.func,
};

Card.defaultProps = {
  url: '',
  index: 0,
  active: false,
  clickShowModal: () => {},
};

export default Card;
